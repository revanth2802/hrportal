function DepartmentForm({ onSave, department = {} }) {
    const [name, setName] = useState(department.name || '');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({ ...department, name });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Department Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    );
  }
  