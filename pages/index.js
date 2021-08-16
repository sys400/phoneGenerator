import axios from "axios";
import { useCallback, useState } from "react";

import "tailwindcss/tailwind.css";
import { ExportCSV } from "./../components/exportCsv";
import Navbar from "../components/navbar";

export default function Home(props) {
  const [phone, setPhone] = useState([]);
  const [areaCode, setAreaCode] = useState("");
  const [cityPrefix, setCityPrefix] = useState("");

  const searchNumber = useCallback(
    async (number) => {
      console.log(number);
      const { data } = await axios.post(
        "http://localhost:3000/api/generateNumbers",
        { number }
      );
      setPhone([...phone, data.phoneCollection]);
    },
    [phone]
  );
  const renderExportToCSV = (phone) => {
    let phoneNumbers = [];
    phone.map((number, key) => {
      number.map((item) => {
        phoneNumbers.push({ phoneNumbers: item });
      });
    });

    return <ExportCSV csvData={phoneNumbers} fileName="phoneGenerator" />;
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex items-center">
          <div className="ml-0 mr-4 my-4">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Area code
            </label>
            <div className="mt-1 flex rounded-md ">
              <input
                type="text"
                name="phonenumber"
                id="phonenumber"
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="304"
                minLength={3}
                maxLength={3}
                onChange={(e) => setAreaCode(e.target.value)}
              />
            </div>
          </div>
          <div className="m-4">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              City Prefix
            </label>
            <div className="mt-1 flex ">
              <input
                type="text"
                name="phonenumber"
                id="phonenumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="991"
                minLength={3}
                maxLength={3}
                onChange={(e) => setCityPrefix(e.target.value)}
              />
            </div>
          </div>
          <div className="m-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => searchNumber({ number: areaCode + cityPrefix })}
            >
              Consultar numeros telfonicos
            </button>
          </div>
          {phone.length > 0 && (
            <div className="m-4">{renderExportToCSV(phone)}</div>
          )}
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="shadow-lg bg-white w-full">
            <thead>
              <tr>
                <th className="bg-blue-100 border text-left px-8 py-4">ID</th>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Area Code
                </th>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              {phone.map((item) => {
                return item.map((number, key) => (
                  <tr key={key}>
                    <td className="border px-8 py-4">{key}</td>
                    <td className="border px-8 py-4">{areaCode}</td>
                    <td className="border px-8 py-4">{number}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
