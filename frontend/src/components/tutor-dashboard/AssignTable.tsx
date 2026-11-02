interface Student {
  id: string;
  fullName: string;
  classGrade: string;
}

interface Props {
  students: Student[];
  selectedStudents: string[];
  onToggle: (id: string) => void;
}

export default function AssignTable({
  students = [],
  selectedStudents = [],
  onToggle,
}: Props) {
  return (
    <div className="overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white">
      <table className="w-full">
        <thead className="bg-[#F7F2E9]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-[#58646C]">
              Select
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-[#58646C]">
              Student name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-[#58646C]">
              Class
            </th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-sm text-[#58646C]"
              >
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.id} className="border-t border-[#1C2B22]/10">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(s.id)}
                    onChange={() => onToggle(s.id)}
                    className="accent-[#D79A2C]"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-[#1C2B22]">{s.fullName}</td>
                <td className="px-6 py-4 text-sm text-[#1C2B22]">
                  Class {s.classGrade}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
