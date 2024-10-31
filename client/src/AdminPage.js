import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminEventList from "./AdminEventList";
import AdminCategoryEditor from "./AdminCategoryEditor";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    time: "",
    location: "",
    image: "",
  });
  const [categories, setCategories] = useState([])
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      console.log(id);
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/events/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const event = await response.json();
      if (!event) {
        console.warn(`Event with id ${id} not found`);
        navigate("/editor");
        return;
      }
      setForm(event);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const event = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:5050/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });
      } else {
        response = await fetch(`http://localhost:5050/events/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred adding or updating an event: ", error);
    } finally {
      setForm({
        name: "",
        category: "",
        time: "",
        location: "",
        image: "",
      });
      navigate("/editor");
    }
  }

  useEffect(() => {
    async function getCategories() {
        const response = await fetch(`http://localhost:5050/categories`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const categories = await response.json();
        setCategories(categories);
      }
      getCategories();
      return;
  }, [categories.length])

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
        />
        <select
          name="category"
          id="category"
          value={form.category}
          onChange={(e) => updateForm({ category: e.target.value })}
        >
            <option value="">category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="time"
          id="time"
          placeholder="time"
          value={form.time}
          onChange={(e) => updateForm({ time: e.target.value })}
        />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="location"
          value={form.location}
          onChange={(e) => updateForm({ location: e.target.value })}
        />
        <input
          type="text"
          name="image"
          id="image"
          placeholder="image"
          value={form.image}
          onChange={(e) => updateForm({ image: e.target.value })}
        />
        <button>Submit</button>
      </form>
      <AdminEventList />
      <AdminCategoryEditor />
    </>
  );
}
