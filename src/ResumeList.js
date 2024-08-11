import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeList.css';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [currentApplicant, setCurrentApplicant] = useState(0);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      setResumes(data.resume);
      setFilteredResumes(data.resume);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (filter === '') {
      setFilteredResumes(resumes);
    } else {
      setFilteredResumes(resumes.filter(resume =>
        resume.basics.name.toLowerCase().includes(filter.toLowerCase()) ||
        resume.basics.AppliedFor.toLowerCase().includes(filter.toLowerCase())
      ));
    }
  }, [filter, resumes]);

  const nextApplicant = () => {
    setCurrentApplicant((prev) =>
      prev + 1 < filteredResumes.length ? prev + 1 : prev
    );
  };

  const prevApplicant = () => {
    setCurrentApplicant((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/');
  };

  return (
    <div className="resume-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="search-container">
        {/* Conditionally render Previous button */}
        {currentApplicant > 0 && (
          <button className="prev-button" onClick={prevApplicant}>
            Previous
          </button>
        )}
        
        <input
          type="text"
          placeholder="Filter by job title or name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        
        {/* Conditionally render Next button */}
        {currentApplicant < filteredResumes.length - 1 && (
          <button className="next-button" onClick={nextApplicant}>
            Next
          </button>
        )}
      </div>
      {filteredResumes.length > 0 ? (
        <div className="resume-details">
          <div className="resume-header">
            <h2>{filteredResumes[currentApplicant].basics.name}</h2>
            <h3>Applied For: {filteredResumes[currentApplicant].basics.AppliedFor}</h3>
          </div>
          <div className="resume-body">
            <div className="left-panel">
              <section>
                <h4>Personal Information</h4>
                <p>{filteredResumes[currentApplicant].basics.phone}</p>
                <p>{filteredResumes[currentApplicant].basics.email}</p>
                <a href={filteredResumes[currentApplicant].basics.profiles.url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </section>
              <section>
                <h4>Technical Skills</h4>
                {filteredResumes[currentApplicant].skills.keywords.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))}
              </section>
              <section>
                <h4>Hobbies</h4>
                {filteredResumes[currentApplicant].interests.hobbies.map((hobby, index) => (
                  <p key={index}>{hobby}</p>
                ))}
              </section>
            </div>
            <div className="right-panel">
              <section>
                <h4>Work Experience</h4>
                <p>Company Name: {filteredResumes[currentApplicant].work.company}</p>
                <p>Position: {filteredResumes[currentApplicant].work.Position}</p>
                <p>Start Date: {filteredResumes[currentApplicant].work["Start Date"]}</p>
                <p>End Date: {filteredResumes[currentApplicant].work["End Date"]}</p>
                <p>Summary: {filteredResumes[currentApplicant].work.Summary}</p>
              </section>
              <section>
                <h4>Projects</h4>
                <p>{filteredResumes[currentApplicant].projects.name}: {filteredResumes[currentApplicant].projects.description}</p>
              </section>
              <section>
                <h4>Education</h4>
                <p>UG: {filteredResumes[currentApplicant].education.UG.institute}, {filteredResumes[currentApplicant].education.UG.course}, {filteredResumes[currentApplicant].education.UG.cgpa}</p>
                <p>PU: {filteredResumes[currentApplicant].education["Senior Secondary"].institute}, {filteredResumes[currentApplicant].education["Senior Secondary"].cgpa}</p>
                <p>High School: {filteredResumes[currentApplicant].education["High School"].institute}, {filteredResumes[currentApplicant].education["High School"].cgpa}</p>
              </section>
              <section>
                <h4>Internship</h4>
                <p>Company Name: {filteredResumes[currentApplicant].Internship["Company Name"]}</p>
                <p>Position: {filteredResumes[currentApplicant].Internship.Position}</p>
                <p>Start Date: {filteredResumes[currentApplicant].Internship["Start Date"]}</p>
                <p>End Date: {filteredResumes[currentApplicant].Internship["End Date"]}</p>
                <p>Summary: {filteredResumes[currentApplicant].Internship.Summary}</p>
              </section>
              <section>
                <h4>Achievements</h4>
                {filteredResumes[currentApplicant].achievements.Summary.map((achievement, index) => (
                  <p key={index}>{achievement}</p>
                ))}
              </section>
            </div>
          </div>
        </div>
      ) : (
        <p className="error">Invalid search or No applications for this job</p>
      )}
    </div>
  );
};

export default ResumeList;
