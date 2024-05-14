import axios from "../../api/api";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [mainCount, setMainCount] = useState({});
  const [testCount, setTestCount] = useState({});
  console.log(mainCount);
  console.log(testCount);
  useEffect(() => {
    const getApi = async () => {
      await axios
        .get("/visitors/getcountmain")
        .then((res) => setMainCount(res.data))
        .catch((error) => console.log(error));

      await axios
        .get("/visitors/gettestcount")
        .then((res) => setTestCount(res.data))
        .catch((error) => console.log(error));
    };
    getApi();
  }, []);
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <h1 className="text-2xl text-gray-800 dark:text-gray-200">
              Saytga tashriflar soni:{" "}
              <span className="text-green-700 ml-2 mr-1 dark:text-green-400">
                {mainCount.count}
              </span>
              ta
            </h1>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <h1 className="text-2xl text-gray-800 dark:text-gray-200">
              Testni ishlaganlar soni:
              <span className="text-green-700 dark:text-green-400 ml-2 mr-1">
                {testCount.count}
              </span>
              ta
            </h1>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <h1 className="text-2xl text-gray-800 dark:text-gray-200">Salom</h1>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <h1 className="text-2xl text-gray-800 dark:text-gray-200">Salom</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
