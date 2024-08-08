import { useEffect, useState } from "react";

import { _data, configs } from "./data";

export interface IClassResult {
  className: string;
  totalObtainable: number;
  totalStudents: number;
  subjects: string[];
  pageSize: "full" | "half2" | "half";
  results: {
    studentName: string;
    subjects: { name: string; score: number }[];
    totalObtained: number;
    position: number;
    quran: {
      title: string;
      mark: string;
    }[];
  }[];
}
export default function useDataTransform() {
  const [data, setData] = useState<IClassResult[]>([]);
  const [showClass, setShowClass] = useState("");
  const [showInput, setShowInput] = useState("");
  useEffect(() => {
    setData(() => {
      return _data.map((d) => {
        const _resp: Partial<IClassResult> = {
          results: [],
          totalStudents: 0,
          pageSize: d.pageSize,
        };
        _resp.className = d.class;
        let subjects = [];
        d.rawData.split("\n").map((line, index) => {
          const spl = line
            .replaceAll("،", ",")
            .replaceAll(".", ",")
            .split(",")
            .map((c) => c.trim());
          if (index == 0) {
            subjects = spl.slice(1);
            _resp.subjects = subjects;
            _resp.totalObtainable = 100 * subjects.length;
          } else {
            _resp.totalStudents += 1;
            let totalScore = 0;
            let quran = null;
            _resp.results.push({
              studentName: spl[0]?.split("-").splice(-1)[0],
              subjects: subjects
                .map((s, i) => {
                  const scoreCol = spl[i + 1];
                  if (scoreCol?.includes(";")) {
                    const [s1, s2, s3] = scoreCol.split(";");
                    const total = [s1, s2, s3]
                      .map((s) => Number(s))
                      .reduce((a, b) => a + b, 0);
                    quran = [
                      { title: configs.total, mark: total },
                      { title: configs.revision, mark: s3 },
                      { title: configs.recitation, mark: s2 },
                      { title: configs.hifz, mark: s1 },
                    ];
                    totalScore += Number(total);
                    return null;
                  }
                  const score = Number(arabicToEnglish(scoreCol)) || 0;
                  totalScore += score;
                  return {
                    name: s,
                    score,
                  };
                })
                .filter(Boolean),
            });
            const index = _resp.results.length - 1;
            _resp.results[index].totalObtained = totalScore;
            _resp.results[index].quran = quran;
          }
        });
        return {
          ..._resp,
          results: _resp.results.map((r) => {
            const position = 1;
            const tops = _resp.results.filter(
              (res) => res.totalObtained > r.totalObtained,
            ).length;
            return {
              ...r,
              position: tops + 1,
            };
          }),
        };
      });
    });
  }, []);
  const [sortBy, setSortBy] = useState<"name" | "grade" | "none">("grade");
  function filtered() {
    return caligraphData()
      .filter((f) => {
        if (showInput) return showInput.includes(f.className);
        if (showClass && showClass != "All") {
          return f.className == showClass;
        }
        return true;
      })
      .map((da) => {
        return {
          ...da,
          results: da.results
            .filter(
              (r) =>
                r.totalObtained > 0 &&
                r.subjects.filter((s) => s.score > 0).length > 1,
            )
            .sort(
              sortBy == "name"
                ? (a, b) => a.studentName.localeCompare(b.studentName, ["ar"])
                : sortBy == "grade"
                  ? (a, b) => b.totalObtained - a.totalObtained
                  : undefined,
            ),
        };
      });
  }
  function col(title, value, cols) {
    return { title, value, cols };
  }
  function arabicToEnglish(arabicNum) {
    const arabicToEnglishMap = {
      "٠": "0",
      "١": "1",
      "٢": "2",
      "٣": "3",
      "٤": "4",
      "٥": "5",
      "٦": "6",
      "٧": "7",
      "٨": "8",
      "٩": "9",
    };

    return arabicNum
      ?.split("")
      .map((char) => arabicToEnglishMap[char] || char)
      .join("");
  }
  const enToAr = function (v) {
    return String(v).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  };
  function caligraphData() {
    const uncals = [];
    const resp = data.map((cl) => {
      cl.results = cl.results.map((res) => {
        let name = res.studentName;
        const spl = name.split(" ").filter(Boolean);
        let calibrigraphed = false;
        name = spl
          .map((s) => {
            const cal = configs.caligraphs[s];
            if (!cal) {
              if (!uncals.some((u) => u == s)) {
                uncals.push(s);
              }
            } else {
              calibrigraphed = true;
            }
            const ret = cal ? cal : s;
            return ret;
          })
          .join(" ");

        return {
          ...res,
          studentName: name,
        };
      });
      return cl;
    });
    console.log(
      Array.from(
        new Set(uncals.filter((s) => !s?.includes("ــــــــــ"))),
      ).sort((a, b) => a.localeCompare(b, ["ar"])),
    );
    return resp;
  }
  return {
    data,
    setSortBy,
    showInput,
    setShowInput,
    showClass,
    setShowClass,
    filtered,
    header: [
      col("العام الدراسي", "1445/1446هـ", 4),
      col(
        "اسم التلميذ/التلميذة",
        ({ result }: RenProps) => (
          <div className="text-xl">{result.studentName}</div>
        ),
        8,
      ),
      col("الدرجة", ({ result }) => enToAr(result.position), 2),
      col(
        "عدد الطلاب في الفصل",
        ({ result, fasl }: RenProps) => (
          <span>{enToAr(fasl.totalStudents)}</span>
        ),
        3,
      ),
      col("المجموع الكلي", ({ result }) => enToAr(result.totalObtained), 2),
      col("الفترة", "الأولى", 2),
      col("الفصل", ({ result, fasl }) => fasl.className, 3),
      //   col("الدرجة", (s) => s.position, 3),
    ],
    enToAr,
  };
}

interface RenProps {
  result?;
  fasl?;
}
