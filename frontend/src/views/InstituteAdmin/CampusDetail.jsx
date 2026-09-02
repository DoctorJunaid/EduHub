import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Buildings, Calendar, Clock, Users, BookOpen, 
  GraduationCap, CheckCircle, XCircle, Warning, Plus, 
  MapPin, Medal, Trash, Check, UserCheck, MagnifyingGlass, Faders
} from '@phosphor-icons/react';
import { 
  getCampusFullData, addClassSchedule, deleteClassSchedule, 
  addExamSchedule, deleteExamSchedule, updateTeacherAttendance, 
  updateStudentAttendance 
} from '../../data/mockData';

export default function CampusDetail({ user }) {
  const { id: routeId } = useParams();
  const id = routeId || user?.profile?.campusId || 'camp_1';
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('classes');
  const [dataVersion, setDataVersion] = useState(0);

  // Forms states
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClass, setNewClass] = useState({
    subject: '',
    dayOfWeek: 'Monday & Wednesday',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    room: 'Lab 101',
    section: 'Section A',
    teacherProfileId: 'tp_1'
  });

  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [newExam, setNewExam] = useState({
    subject: '',
    examType: 'Midterm Exam',
    date: '2025-04-01',
    time: '10:00 AM - 01:00 PM',
    room: 'Main Examination Hall',
    invigilator: 'Dr. Usman Khan',
    totalMarks: 100
  });

  const campusData = getCampusFullData(id);

  if (!campusData) {
    return (
      <div className="content-container animate-fade-in" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Campus Not Found</h2>
        <p style={{ color: 'var(--text-muted)' }}>The requested campus branch does not exist or has been deleted.</p>
        <button 
          onClick={() => navigate('/dashboard/campuses')}
          style={{ marginTop: 16, padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600 }}
        >
          Back to Campuses
        </button>
      </div>
    );
  }

  const { 
    campus, parentInstitute, teachers, students, classes, 
    exams, teacherAttendanceToday, studentAttendanceRecords, performanceRecords 
  } = campusData;

  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!newClass.subject) return;
    addClassSchedule({ ...newClass, campusId: id });
    setShowAddClassModal(false);
    setNewClass({
      subject: '',
      dayOfWeek: 'Monday & Wednesday',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      room: 'Lab 101',
      section: 'Section A',
      teacherProfileId: teachers[0]?.id || 'tp_1'
    });
    setDataVersion(v => v + 1);
  };

  const handleDeleteClass = (classId) => {
    if (confirm('Remove this scheduled class?')) {
      deleteClassSchedule(classId);
      setDataVersion(v => v + 1);
    }
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    if (!newExam.subject) return;
    addExamSchedule({ ...newExam, campusId: id });
    setShowAddExamModal(false);
    setNewExam({
      subject: '',
      examType: 'Midterm Exam',
      date: '2025-04-01',
      time: '10:00 AM - 01:00 PM',
      room: 'Main Examination Hall',
      invigilator: teachers[0]?.user?.name || 'Dr. Usman Khan',
      totalMarks: 100
    });
    setDataVersion(v => v + 1);
  };

  const handleDeleteExam = (examId) => {
    if (confirm('Delete this exam datesheet record?')) {
      deleteExamSchedule(examId);
      setDataVersion(v => v + 1);
    }
  };

  const handleToggleTeacherAttendance = (teacherProfileId, currentStatus) => {
    const nextStatus = currentStatus === 'Present' ? 'Late' : currentStatus === 'Late' ? 'On Leave' : 'Present';
    updateTeacherAttendance(teacherProfileId, id, nextStatus);
    setDataVersion(v => v + 1);
  };

  const handleToggleStudentAttendance = (studentProfileId, subject, currentStatus) => {
    const nextStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
    updateStudentAttendance(studentProfileId, id, subject, nextStatus);
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 28 }}>
      {/* Back link */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          onClick={() => navigate('/dashboard/campuses')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500 }}
        >
          <ArrowLeft size={18} /> Back to All Campuses
        </button>
        <button
          onClick={() => navigate(`/dashboard/campuses/${id}/edit`)}
          style={{ padding: '8px 16px', background: 'var(--card-bg)', border: '1px solid var(--border-strong)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
        >
          Edit Campus Details
        </button>
      </div>

      {/* Hero Campus Header */}
      <div className="table-card" style={{ padding: '28px 32px', background: 'var(--card-bg)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-strong)' }}>
            <Buildings size={32} color="var(--primary)" />
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <h1 style={{ margin: 0, fontSize: '1.6rem', color: 'var(--text-heading)', fontWeight: 700 }}>{campus.name}</h1>
              <span className="status-pill completed">Active Campus</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--text-muted)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={16} /> {campus.address}
              </span>
              <span>•</span>
              <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{parentInstitute?.name}</span>
            </div>
          </div>
        </div>

        {/* High-level KPI Mini Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
          <div style={{ background: 'var(--bg-color)', padding: '14px 18px', borderRadius: 12, border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, display: 'block' }}>Enrolled Students</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)' }}>{students.length}</span>
          </div>
          <div style={{ background: 'var(--bg-color)', padding: '14px 18px', borderRadius: 12, border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, display: 'block' }}>Faculty Members</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)' }}>{teachers.length}</span>
          </div>
          <div style={{ background: 'var(--bg-color)', padding: '14px 18px', borderRadius: 12, border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, display: 'block' }}>Scheduled Classes</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)' }}>{classes.length}</span>
          </div>
          <div style={{ background: 'var(--bg-color)', padding: '14px 18px', borderRadius: 12, border: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, display: 'block' }}>Upcoming Exams</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)' }}>{exams.length}</span>
          </div>
        </div>
      </div>

      {/* Clean Segmented Tab Navigation */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-strong)', paddingBottom: 0, overflowX: 'auto' }}>
        {[
          { key: 'classes', label: 'Class Timetable', icon: Calendar },
          { key: 'exams', label: 'Exam Schedules', icon: BookOpen },
          { key: 'teacherAttendance', label: 'Teacher Attendance', icon: UserCheck },
          { key: 'studentAttendance', label: 'Student Attendance', icon: CheckCircle },
          { key: 'performance', label: 'Academic Results', icon: Medal },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 18px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                background: 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: CLASS SCHEDULES */}
      {activeTab === 'classes' && (
        <div className="table-card animate-fade-in">
          <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Active Class Timetable</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Manage weekly class routines, room allocations, and instructors.</p>
            </div>
            <button 
              onClick={() => setShowAddClassModal(true)}
              style={{ padding: '8px 16px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
            >
              <Plus size={16} /> Add Schedule
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Subject & Section</th>
                <th>Days & Time</th>
                <th>Room / Lab</th>
                <th>Assigned Instructor</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No class schedules created for this campus yet. Click "+ Add Schedule" to set up timetables.
                  </td>
                </tr>
              )}
              {classes.map(cls => (
                <tr key={cls.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{cls.subject}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Section: {cls.section || 'General'}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500 }}>
                      <Clock size={15} color="var(--primary)" /> {cls.startTime} - {cls.endTime}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cls.dayOfWeek}</span>
                  </td>
                  <td>
                    <span style={{ padding: '4px 10px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 6, fontSize: '0.85rem', fontWeight: 500 }}>
                      {cls.room}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(59,130,246,0.15)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.75rem' }}>
                        {cls.teacherName.charAt(0)}
                      </div>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-heading)', fontWeight: 500 }}>{cls.teacherName}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDeleteClass(cls.id)}
                      style={{ padding: '6px', color: '#ef4444', background: 'var(--bg-color)', border: '1px solid var(--border-light)', borderRadius: 6, cursor: 'pointer' }}
                      title="Remove class"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: EXAM SCHEDULES */}
      {activeTab === 'exams' && (
        <div className="table-card animate-fade-in">
          <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Campus Examination Datesheet</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Examination timetables, assigned invigilators, and testing halls.</p>
            </div>
            <button 
              onClick={() => setShowAddExamModal(true)}
              style={{ padding: '8px 16px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
            >
              <Plus size={16} /> Schedule Exam
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Subject & Exam Type</th>
                <th>Date & Time</th>
                <th>Exam Hall / Room</th>
                <th>Invigilator</th>
                <th>Total Marks</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No exam schedules active for this campus. Click "+ Schedule Exam" to add examination routines.
                  </td>
                </tr>
              )}
              {exams.map(exam => (
                <tr key={exam.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{exam.subject}</div>
                    <span className="status-pill completed" style={{ fontSize: '0.75rem', padding: '2px 8px', marginTop: 4 }}>{exam.examType}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{exam.date}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exam.time}</span>
                  </td>
                  <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{exam.room}</td>
                  <td>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-heading)' }}>{exam.invigilator}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{exam.totalMarks} pts</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDeleteExam(exam.id)}
                      style={{ padding: '6px', color: '#ef4444', background: 'var(--bg-color)', border: '1px solid var(--border-light)', borderRadius: 6, cursor: 'pointer' }}
                      title="Delete exam entry"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: TEACHER ATTENDANCE */}
      {activeTab === 'teacherAttendance' && (
        <div className="table-card animate-fade-in">
          <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Faculty & Staff Daily Attendance</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Today's check-in status for teachers assigned to {campus.name}. Click status to toggle.</p>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Teacher / Faculty</th>
                <th>Department</th>
                <th>Check-in Time</th>
                <th>Attendance Status</th>
                <th style={{ textAlign: 'right' }}>Quick Toggle Action</th>
              </tr>
            </thead>
            <tbody>
              {teacherAttendanceToday.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No teachers assigned to this campus.</td>
                </tr>
              )}
              {teacherAttendanceToday.map(({ teacher, status, checkInTime }) => (
                <tr key={teacher.id}>
                  <td>
                    <div className="td-user">
                      <img src={teacher.user?.avatar} alt="" style={{ width: 38, height: 38, borderRadius: '50%' }} />
                      <div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block' }}>{teacher.user?.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{teacher.user?.email}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{teacher.department || 'General'}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{status === 'On Leave' ? '-' : checkInTime}</td>
                  <td>
                    <span 
                      className={`status-pill ${status === 'Present' ? 'completed' : status === 'Late' ? 'inprogress' : 'cancelled'}`}
                      style={{ padding: '6px 12px', cursor: 'pointer' }}
                      onClick={() => handleToggleTeacherAttendance(teacher.id, status)}
                    >
                      {status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleToggleTeacherAttendance(teacher.id, status)}
                      style={{ padding: '6px 14px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: STUDENT ATTENDANCE RECORDS */}
      {activeTab === 'studentAttendance' && (
        <div className="table-card animate-fade-in">
          <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Student Attendance Register</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Daily lecture attendance records for enrolled students.</p>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Lecture / Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Update Record</th>
              </tr>
            </thead>
            <tbody>
              {studentAttendanceRecords.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No student attendance records logged for this campus yet.</td>
                </tr>
              )}
              {studentAttendanceRecords.map(rec => (
                <tr key={rec.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{rec.studentName}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rec.email}</span>
                  </td>
                  <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{rec.subject}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{rec.date}</td>
                  <td>
                    <span className={`status-pill ${rec.status === 'Present' ? 'completed' : 'cancelled'}`} style={{ padding: '6px 12px' }}>
                      {rec.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleToggleStudentAttendance(rec.studentProfileId, rec.subject, rec.status)}
                      style={{ padding: '6px 14px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}
                    >
                      Mark {rec.status === 'Present' ? 'Absent' : 'Present'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: STUDENT PERFORMANCE & GRADES */}
      {activeTab === 'performance' && (
        <div className="table-card animate-fade-in">
          <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Student Academic Performance & Gradebook</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Semester examination scores, GPA evaluations, and instructor remarks.</p>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course / Subject</th>
                <th>Score & Percentage</th>
                <th>Grade</th>
                <th>GPA</th>
                <th>Academic Remarks</th>
              </tr>
            </thead>
            <tbody>
              {performanceRecords.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No performance records submitted yet.</td>
                </tr>
              )}
              {performanceRecords.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{item.studentName}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.semester}</span>
                  </td>
                  <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.subject}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.marks} / {item.totalMarks}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({((item.marks / item.totalMarks) * 100).toFixed(0)}%)</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-pill completed" style={{ fontWeight: 700 }}>{item.grade}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: item.gpa >= 3.5 ? 'var(--green)' : 'var(--text-heading)' }}>
                      {item.gpa.toFixed(2)}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 260 }}>
                    {item.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL: ADD CLASS SCHEDULE */}
      {showAddClassModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 540, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Schedule New Class</h3>
              <button onClick={() => setShowAddClassModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreateClass} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subject Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Advanced Operating Systems"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Days of Week</label>
                  <input 
                    type="text" 
                    value={newClass.dayOfWeek}
                    onChange={(e) => setNewClass({ ...newClass, dayOfWeek: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Section / Batch</label>
                  <input 
                    type="text" 
                    value={newClass.section}
                    onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Start Time</label>
                  <input 
                    type="text" 
                    value={newClass.startTime}
                    onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>End Time</label>
                  <input 
                    type="text" 
                    value={newClass.endTime}
                    onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Room / Lab</label>
                  <input 
                    type="text" 
                    value={newClass.room}
                    onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Instructor</label>
                  <select
                    value={newClass.teacherProfileId}
                    onChange={(e) => setNewClass({ ...newClass, teacherProfileId: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.user?.name || 'Instructor'}</option>
                    ))}
                    {teachers.length === 0 && <option value="tp_1">Default Instructor</option>}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddClassModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD EXAM SCHEDULE */}
      {showAddExamModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 540, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Schedule Exam</h3>
              <button onClick={() => setShowAddExamModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreateExam} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subject Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Artificial Intelligence"
                  value={newExam.subject}
                  onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Exam Type</label>
                  <select
                    value={newExam.examType}
                    onChange={(e) => setNewExam({ ...newExam, examType: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    <option value="Midterm Exam">Midterm Exam</option>
                    <option value="Final Exam">Final Exam</option>
                    <option value="Quiz / Assessment">Quiz / Assessment</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Exam Date</label>
                  <input 
                    type="date" 
                    value={newExam.date}
                    onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Time Window</label>
                  <input 
                    type="text" 
                    value={newExam.time}
                    onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Total Marks</label>
                  <input 
                    type="number" 
                    value={newExam.totalMarks}
                    onChange={(e) => setNewExam({ ...newExam, totalMarks: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Hall / Room</label>
                  <input 
                    type="text" 
                    value={newExam.room}
                    onChange={(e) => setNewExam({ ...newExam, room: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Invigilator</label>
                  <input 
                    type="text" 
                    value={newExam.invigilator}
                    onChange={(e) => setNewExam({ ...newExam, invigilator: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddExamModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Confirm Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
