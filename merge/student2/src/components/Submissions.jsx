import './Submissions.css'

function Submissions() {
  return (
    <div className="submissions">
      <h1>Internship Submissions</h1>
      <div className="submissions-list">
        <div className="submission-card">
          <h3>Software Engineering Intern</h3>
          <p>Company: Tech Corp</p>
          <p>Status: Pending</p>
        </div>
        <div className="submission-card">
          <h3>Web Developer Intern</h3>
          <p>Company: Digital Solutions</p>
          <p>Status: Accepted</p>
        </div>
      </div>
    </div>
  )
}

export default Submissions 