import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDashboardStats } from '../../api/dashboardApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboardStats()
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error('Failed to load dashboard stats:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const statCards = [
    {
      value: stats?.totalLeads ?? 0,
      label: 'Total Enquiries',
      accent: 'blue',
    },
    {
      value: stats?.newLeads ?? 0,
      label: 'New Enquiries',
      accent: 'orange',
    },
    {
      value: stats?.totalCases ?? 0,
      label: 'Application Cases',
      accent: 'purple',
    },
    {
      value: stats?.pendingTestimonials ?? 0,
      label: 'Pending Testimonials',
      accent: 'red',
    },
    {
      value: stats?.approvedTestimonials ?? 0,
      label: 'Approved Testimonials',
      accent: 'green',
    },
  ];

  const adminLinks = [
    {
      to: '/admin/leads',
      title: 'Enquiries',
      description: 'Review and update lead status.',
      icon: '↗',
    },
    {
      to: '/admin/testimonials',
      title: 'Testimonials',
      description: 'Approve or reject client reviews.',
      icon: '★',
    },
    {
      to: '/admin/services',
      title: 'Services',
      description: "Manage what's shown publicly.",
      icon: '◆',
    },
    {
      to: '/admin/faqs',
      title: 'FAQs',
      description: 'Add, edit, publish or unpublish.',
      icon: '?',
    },
    {
      to: '/admin/cases',
      title: 'Application Cases',
      description: 'Create cases and update status.',
      icon: '▣',
    },
  ];

  return (
    <div className="admin-dashboard page wrap">

      {/* Header */}
      <section className="admin-dashboard-header">
        <div>
          <p className="eyebrow">ADMIN CONTROL CENTER</p>

          <h1>Dashboard</h1>

          <p className="admin-dashboard-subtitle">
            Monitor enquiries, applications and website content.
          </p>
        </div>

        <div className="admin-live-indicator">
          <span />
          System Active
        </div>
      </section>

      {/* Statistics */}
      <section className="admin-stats-grid">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className={`admin-stat-card admin-stat-${stat.accent}`}
            style={{ '--delay': `${index * 80}ms` }}
          >
            <div className="admin-stat-top">
              <span className="admin-stat-label">
                {stat.label}
              </span>

              <span className="admin-stat-arrow">
                ↗
              </span>
            </div>

            <strong>
              {loading ? '—' : stat.value}
            </strong>

            <div className="admin-stat-line">
              <span />
            </div>
          </div>
        ))}
      </section>

      {/* Management */}
      <section className="admin-management-section">

        <div className="admin-section-title">
          <div>
            <p className="eyebrow">MANAGEMENT</p>
            <h2>Quick Access</h2>
          </div>
        </div>

        <div className="admin-management-grid">
          {adminLinks.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className="admin-management-card"
              style={{ '--delay': `${index * 70}ms` }}
            >
              <div className="admin-card-glow" />

              <div className="admin-card-icon">
                {item.icon}
              </div>

              <div className="admin-card-content">
                <h3>{item.title}</h3>

                <p>
                  {item.description}
                </p>
              </div>

              <div className="admin-card-arrow">
                →
              </div>
            </Link>
          ))}
        </div>

      </section>
    </div>
  );
}