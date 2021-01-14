import React, { useState, useEffect } from "react";
import Records from "./Component/Records";
import Pagination from "./Component/Pagination";
import SearchForm from "./Component/SearchForm";
import axios from "axios";
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
  const [records, setRecord] = useState([
    {
      FirstName: "Toney",
      LastName: "Stracke",
      Gender: "Male",
      Latitude: 13.551178,
      Longitude: -22.88681,
      CreditCardNumber: "5370814613154673",
      CreditCardType: "MasterCard",
      Email: "TkhdpLS@QHVkRMi.org",
      DomainName: "ltxaTdR.org",
      PhoneNumber: "359-142-8610",
      MacAddress: "24:ae:ad:16:ed:5b",
      URL: "http://AUAtjfq.biz/OaikkEq.html",
      UserName: "HBKQjcL",
      LastLogin: "1996-06-02 19:14:06",
      PaymentMethod: "check",
    },
    {
      FirstName: "Aisha",
      LastName: "Haag",
      Gender: "Prefer to skip",
      Latitude: -60.97193,
      Longitude: -62.261574,
      CreditCardNumber: "5458393180258304",
      CreditCardType: "MasterCard",
      Email: "QoYDhrW@xbDcEuR.net",
      DomainName: "sfmQSQB.ru",
      PhoneNumber: "631-019-2485",
      MacAddress: "bd:53:b7:f0:09:8f",
      URL: "https://bwfoInO.ru/",
      UserName: "vMFuMWt",
      LastLogin: "1990-11-05 03:24:53",
      PaymentMethod: "cc",
    },
    {
      FirstName: "Bridie",
      LastName: "Adams",
      Gender: "Female",
      Latitude: 8.670197,
      Longitude: 1.917572,
      CreditCardNumber: "5420507013917076",
      CreditCardType: "MasterCard",
      Email: "EqEXfDf@uUjcAqk.org",
      DomainName: "gOOZjxG.info",
      PhoneNumber: "321-591-0478",
      MacAddress: "4d:ff:9d:07:8a:0e",
      URL: "https://vOqigwR.net/uvkNCAU.php",
      UserName: "tOYVpJq",
      LastLogin: "2006-06-15 13:37:12",
      PaymentMethod: "paypal",
    },
  ]);
  
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [params, setParams] = useState({});

  const BASE_URL = "https://api.enye.tech/v1/challenge/records";

  useEffect(() => {
    const getRecord = async () => {
      setLoading(true);
      const dataResult = await axios.get(BASE_URL);
      setRecord(dataResult.data.records.profiles);
      setLoading(false);
    };
    getRecord();
  }, []);

  const indexOfLastRecord = page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setPage(pageNumber);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return {
        ...prevParams,
        [param]: value,
      };
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">RECORD API</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <Pagination
        recordsPerPage={recordsPerPage}
        totalRecords={records.length}
        paginate={paginate}
      />
      <Records records={currentRecords} loading={loading} />
    </Container>
  );
}

export default App;
