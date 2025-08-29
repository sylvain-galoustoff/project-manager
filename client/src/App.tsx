import type { User, Project } from "@meloprojects/shared";

const demoUser: User = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
};

const demoProjects: Project[] = [
  { id: "p1", name: "Meloprojects", ownerId: "1" },
  { id: "p2", name: "Website Redesign", ownerId: "1" },
  { id: "p3", name: "Mobile App", ownerId: "1" },
];

function App() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Welcome, {demoUser.name} 👋</h1>
      <h2>Your Projects:</h2>
      <ul>
        {demoProjects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong> (Owner ID: {project.ownerId})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
