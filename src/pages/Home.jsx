export default function Home() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-10">
        🏥 Smart Health Monitoring Dashboard
      </h1>

      <div className="max-w-5xl mx-auto space-y-12">

        {/* Project Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Project Overview</h2>
          <p className="mb-2">
            This platform bridges the gap between healthcare services and communities in rural and tribal areas. It connects ASHA workers, doctors, and government hospitals to ensure timely medical attention, particularly for diseases linked to water contamination.
          </p>
          <p>
            The system monitors health-related cases reported by community workers and facilitates efficient coordination between stakeholders for rapid response and preventive care.
          </p>
        </section>

        {/* Purpose */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Purpose</h2>
          <p>
            To detect and respond to health issues arising from contaminated water sources and ensure faster medical intervention through digital coordination.
          </p>
        </section>

        {/* How it Works */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Platform Functionality</h2>

          <h3 className="text-xl font-semibold mb-2">User Roles</h3>
          <ul className="list-disc list-inside mb-4">
            <li><b>ASHA Workers:</b> Report cases of illness, including symptoms, location, and potential water source contamination.</li>
            <li><b>Doctors:</b> Review cases, provide medical guidance, and schedule hospital appointments if required.</li>
            <li><b>Government Hospitals:</b> Manage staff availability, confirm appointments, and track the status of ongoing health cases.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Health Query Submission</h3>
          <p className="mb-4">
            When a community member falls ill, ASHA workers submit case details, including symptoms, location, suspected water source, and supporting documentation. The system identifies clusters of similar cases to detect potential outbreaks.
          </p>

          <h3 className="text-xl font-semibold mb-2">Waterbody Disease Detection</h3>
          <p className="mb-4">
            The platform identifies patterns of diseases linked to water sources. Repeated case submissions from the same region trigger alerts for health officials, enabling preventive action and rapid response.
          </p>

          <h3 className="text-xl font-semibold mb-2">Doctor’s Role</h3>
          <p className="mb-4">
            Doctors assess submitted cases, request additional details if necessary, and provide recommendations. In-person visits or hospital appointments can be scheduled directly through the platform.
          </p>

          <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
          <p className="mb-4">
            ASHA workers or doctors can schedule hospital appointments. Hospital staff receive real-time updates to prepare efficiently for incoming patients.
          </p>

          <h3 className="text-xl font-semibold mb-2">Data Monitoring & Reporting</h3>
          <p className="mb-4">
            Administrators and health officials can monitor all submitted cases, analyze regional trends, and track response times to improve healthcare planning and prevent disease spread.
          </p>

          <h3 className="text-xl font-semibold mb-2">Impact</h3>
          <p className="mb-4">
            The platform ensures timely healthcare access, empowers ASHA workers, enables informed doctor responses, and supports government monitoring for early outbreak detection, ultimately saving lives.
          </p>

          <h3 className="text-xl font-semibold mb-2">Future Enhancements</h3>
          <ul className="list-disc list-inside mb-4">
            <li>AI-based detection of waterbody contamination via satellite imagery</li>
            <li>Geo-tagging of cases and water sources</li>
            <li>Integration with rural health programs and government databases</li>
            <li>Support for local languages and dialects for accessibility</li>
            <li>Educational modules for communities and ASHA workers</li>
          </ul>

        </section>
      </div>
    </div>
  );
}
