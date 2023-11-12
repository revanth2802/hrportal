


from functools import wraps
from flask import Flask, request, jsonify
import json
import logging
from urllib.request import urlopen
from jose import jwt, JWTError
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load Auth0 configuration from environment variables
AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN')
ALGORITHMS = ['RS256']
API_AUDIENCE = os.environ.get('API_AUDIENCE')

# Function to fetch Auth0 Public Key
def fetch_jwks():
    jwks_url = f'https://{AUTH0_DOMAIN}/.well-known/jwks.json'
    try:
        response = urlopen(jwks_url)
        jwks = json.loads(response.read())
        return jwks
    except Exception as e:
        logging.error(f"Failed to fetch JWKS: {e}")
        return None

# Check JWT decorator
def check_jwt(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Extract token from the Authorization header
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            logging.error("Authorization header is missing")
            return jsonify({"message": "Authorization header is missing"}), 401

        parts = auth_header.split()

        if parts[0].lower() != 'bearer':
            logging.error("Authorization header must start with Bearer")
            return jsonify({"message": "Authorization header must start with Bearer"}), 401
        elif len(parts) == 1:
            logging.error("Token not found")
            return jsonify({"message": "Token not found"}), 401
        elif len(parts) > 2:
            logging.error("Authorization header must be Bearer token")
            return jsonify({"message": "Authorization header must be Bearer token"}), 401

        token = parts[1]
        
        # Fetch JWKS
        jwks = fetch_jwks()
        if not jwks:
            return jsonify({"message": "JWKS fetch failed"}), 500

        try:
            # Get the unverified header from the token
            header = jwt.get_unverified_header(token)
        except JWTError as e:
            logging.error(f"Invalid token header: {e}")
            return jsonify({"message": "Invalid token header"}), 401

        rsa_key = {}
        for key in jwks['keys']:
            if key['kid'] == header.get('kid'):
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }
                break
        else:
            logging.error("Key ID not found in JWKS.")
            return jsonify({"message": "Key ID not found in JWKS"}), 401

        try:
            # Decode the token with the RSA key
            decoded = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer=f'https://{AUTH0_DOMAIN}/'
            )
        except JWTError as e:
            logging.error(f"Invalid token: {e}")
            return jsonify({"message": "Invalid token"}), 401
        except Exception as e:
            logging.error(f"An error occurred while decoding the token: {e}")
            return jsonify({"message": "An error occurred while decoding the token"}), 500

        return f(*args, **kwargs)  

    return decorated

# Example protected route
@app.route('/protected')
@check_jwt
def protected():
    return jsonify({"message": "Access granted"})

if __name__ == '__main__':
    app.run(debug=True)
