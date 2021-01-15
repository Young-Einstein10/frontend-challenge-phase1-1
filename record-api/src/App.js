import React, { useState, useEffect } from "react";
import Records from "./Component/Records";
import Pagination from "./Component/Pagination";
import SearchForm from "./Component/SearchForm";
import Filter from "./Component/Filter";
import axios from "axios";
import { Container } from "react-bootstrap";
import "./App.css";

const dataList = [
  {
    FirstName: "Destiney",
    LastName: "Yundt",
    Gender: "Male",
    Latitude: -73.421814,
    Longitude: 124.489044,
    CreditCardNumber: "3538859970262382",
    CreditCardType: "JCB",
    Email: "MjEIPIV@AEdtofg.com",
    DomainName: "kxNlDfR.biz",
    PhoneNumber: "891-374-5102",
    MacAddress: "9d:75:ac:4a:7e:05",
    URL: "http://kQEJlbU.ru/",
    UserName: "VWHprfL",
    LastLogin: "1972-10-28 05:20:26",
    PaymentMethod: "cc",
  },
  {
    FirstName: "Aida",
    LastName: "Dach",
    Gender: "Female",
    Latitude: 38.644394,
    Longitude: -48.400986,
    CreditCardNumber: "3558928627725474",
    CreditCardType: "JCB",
    Email: "MYUndKY@RRvpsKK.ru",
    DomainName: "DScMleS.com",
    PhoneNumber: "121-085-9467",
    MacAddress: "ed:27:41:b1:6c:19",
    URL: "https://VcKrHFA.org/",
    UserName: "mUNxdvi",
    LastLogin: "1986-07-11 00:57:35",
    PaymentMethod: "cc",
  },
  {
    FirstName: "Stephany",
    LastName: "Stark",
    Gender: "Female",
    Latitude: 38.76857,
    Longitude: 152.85199,
    CreditCardNumber: "3558354856671504",
    CreditCardType: "JCB",
    Email: "RPGPuXn@dGDDLbC.biz",
    DomainName: "cjOgkCO.ru",
    PhoneNumber: "871-910-5624",
    MacAddress: "cc:8b:6a:e0:cf:43",
    URL: "http://XfCkhoJ.info/accYbFU.html",
    UserName: "eoAoAyu",
    LastLogin: "2008-04-12 21:22:08",
    PaymentMethod: "cc",
  },
  {
    FirstName: "Jeramie",
    LastName: "Reilly",
    Gender: "Female",
    Latitude: 13.475105,
    Longitude: 20.684845,
    CreditCardNumber: "3578298818250475",
    CreditCardType: "JCB",
    Email: "BHCuPDa@IeDvWow.org",
    DomainName: "ADibHet.net",
    PhoneNumber: "615-910-3274",
    MacAddress: "1f:a2:d7:65:84:08",
    URL: "https://bfXERYm.info/SPWQZdA.php",
    UserName: "wRFRHqY",
    LastLogin: "2020-06-17 18:02:48",
    PaymentMethod: "paypal",
  },
  {
    FirstName: "Magdalen",
    LastName: "Schultz",
    Gender: "Male",
    Latitude: -46.527866,
    Longitude: 37.94388,
    CreditCardNumber: "3558635831831331",
    CreditCardType: "JCB",
    Email: "PcjDbiD@GfQECEG.ru",
    DomainName: "VWyjZAw.com",
    PhoneNumber: "472-895-3101",
    MacAddress: "96:c7:d8:fe:35:d3",
    URL: "http://slHOErZ.com/vcpcKfj.php",
    UserName: "xGXdMUZ",
    LastLogin: "1978-11-08 14:23:25",
    PaymentMethod: "check",
  },
  {
    FirstName: "Allene",
    LastName: "Flatley",
    Gender: "Female",
    Latitude: -55.692375,
    Longitude: 45.388214,
    CreditCardNumber: "3548484799689871",
    CreditCardType: "JCB",
    Email: "suIVQsx@UtQyWCj.info",
    DomainName: "yTKyBoj.org",
    PhoneNumber: "176-842-1059",
    MacAddress: "90:3e:5a:0a:09:bd",
    URL: "http://pFFtcQJ.org/fNgoCmb.php",
    UserName: "QoDtbxY",
    LastLogin: "1979-01-19 05:25:35",
    PaymentMethod: "paypal",
  },
];

function App() {
  const [records, setRecord] = useState(dataList);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState({});
  const [data, setData] = useState();

  const BASE_URL = "https://api.enye.tech/v1/challenge/records";

  // const proxy = "https://cors-anywhere.herokuapp.com/"

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

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
    filterData(e.target.value);
  }

  function handleFilterChange(e) {
    const filterString = e.target.value
    const name = e.target.name

    setFilterValue({
      [name]: filterString
    });

  }

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setRecord(dataList);
    else {
      const filteredData = dataList.filter((record) => {
        return Object.keys(record).some((key) =>
          record[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setRecord(filteredData);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">RECORD API</h1>
      <SearchForm
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />

      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />
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
