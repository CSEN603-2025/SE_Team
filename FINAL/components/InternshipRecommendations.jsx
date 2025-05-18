import React from 'react';
import studentsData from '../data/students.json';
import internshipsData from '../data/internships.json';

function InternshipRecommendations({ studentId }) {
  // Find the student by ID
  const student = studentsData.find(s => s.id === studentId);
  if (!student) {
    return <div>No student found.</div>;
  }

  // Prepare the student's interests in lowercase for case-insensitive matching
  const interestsLower = student.interests.map(int => int.toLowerCase());

  // Filter internships that match any interest (by industry or skills)
  const recommendedInternships = internshipsData.filter(internship => {
    const industry = internship.industry?.toLowerCase() || "";
    const skills = internship.skills?.map(skill => skill.toLowerCase()) || [];
    const matchesIndustry = interestsLower.some(int => industry.includes(int));
    const matchesSkill   = interestsLower.some(int => skills.includes(int));
    return matchesIndustry || matchesSkill;
  });

  return (
    <div className="internship-recommendations">
      <h2>Recommended Internships for {student.name}</h2>
      <ul>
        {recommendedInternships.map(intern => (
          <li key={intern.id}>
            <strong>{intern.title}</strong> at {intern.company} – <em>{intern.industry}</em>
          </li>
        ))}
        {recommendedInternships.length === 0 && (
          <li>No matching internships found.</li>
        )}
      </ul>
    </div>
  );
}

export default InternshipRecommendations;
