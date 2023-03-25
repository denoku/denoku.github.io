import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import techCompaniesService from "../services/techCompaniesService";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import SingleTechCo from "./SingleTechCo";
import TechModal from "./TechModal";
import "rc-pagination/assets/index.css";

function TechCo() {
  const navigate = useNavigate();
  const [techCo, setTechCo] = useState({
    arrayOfCompanies: [],
    companyComponents: [],
    pageIndex: 0,
    pageSize: 4,
    totalCount: 9,
  });
  const [showModal, setShowModal] = useState(false);
  const [companyViewed, setCompanyViewed] = useState({});
  const [searchTechCo, setSearchTechCo] = useState({
    query: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onFormFieldChanged = (event) => {
    const target = event.target;

    const newUserValue = target.value;

    const nameOfField = target.name;

    setSearchTechCo((prevState) => {
      const updatedFormData = { ...prevState };
      updatedFormData[nameOfField] = newUserValue;

      return updatedFormData;
    });
  };
  useEffect(() => {
    techCompaniesService
      .getTechCo(techCo.pageIndex, techCo.pageSize)
      .then(getTechCoSuccess)
      .catch(getTechCoError);
  }, [techCo.pageIndex]);

  const onModalClicked = (company) => {
    //console.log("onModalClicked", job);
    setCompanyViewed(company);
    toggleModal();
  };

  const onDeleteClicked = useCallback((myTechCo, eObj) => {
    console.log(myTechCo.id, { myTechCo, eObj });
    const idToBeDeleted = myTechCo.id;

    const handler = getDeleteSuccessHandler(idToBeDeleted);

    techCompaniesService
      .deleteTechCoById(idToBeDeleted)
      .then(handler)
      .catch(OnDeleteTechCoError);
  }, []);

  const onEditClicked = useCallback((myTechCo, eObj) => {
    console.log(myTechCo.id, { myTechCo, eObj });
    const techCoTransport = { type: "MY_TECHCO", payload: myTechCo };
    navigate(`/techcompanies/${myTechCo.id}`, { state: techCoTransport });
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    return () => {
      setTechCo((prevState) => {
        const techCoData = { ...prevState };
        techCoData.arrayOfCompanies = [...techCoData.arrayOfCompanies];

        const idxOf = techCoData.arrayOfCompanies.findIndex((company) => {
          let result = false;
          if (company.id === idToBeDeleted) {
            result = true;
          }
          return result;
        });
        if (idxOf >= 0) {
          techCoData.arrayOfCompanies.splice(idxOf, 1);
          techCoData.companyComponents =
            techCoData.arrayOfCompanies.map(mapCompanies);
        }
        return techCoData;
      });
    };
  };

  const onTechCoSearch = (e) => {
    e.preventDefault();
    var pageIndex = 0;
    var pageSize = 10;

    techCompaniesService
      .searchTechCo(pageIndex, pageSize, searchTechCo.query)
      .then(searchTechCoSuccess)
      .catch(searchTechCoError);
  };

  const getTechCoSuccess = (data) => {
    console.log("getTechCoSuccess", data);
    setTechCo((prevState) => {
      const newCompanies = { ...prevState };
      newCompanies.arrayOfCompanies = data.item.pagedItems;
      newCompanies.pageIndex = data.item.pageIndex;
      newCompanies.pageSize = data.item.pageSize;
      newCompanies.totalCount = data.item.totalCount;

      return newCompanies;
    });
  };

  const getTechCoError = (err) => {
    console.log("getTechCoError", err);
  };

  const OnDeleteTechCoError = (err) => {
    console.log("Deleting", err);
  };

  const searchTechCoSuccess = (response) => {
    console.log("searchTechCoSuccess", response);

    setTechCo((prevState) => {
      const newCo = { ...prevState };
      newCo.arrayOfCompanies = response.data.item.pagedItems;

      return newCo;
    });
  };

  const searchTechCoError = (err) => {
    console.log("searchFrdError", err);
  };

  const mapCompanies = (techCoData) => {
    return (
      <SingleTechCo
        key={"companies list" + techCoData.id}
        techProp={techCoData}
        onEditCompany={onEditClicked}
        onDeleteCompany={onDeleteClicked}
        onModal={onModalClicked}
      />
    );
  };

  const onPageChange = (e) => {
    console.log("pagechange", e);
    const pageClicked = e;
    setTechCo((prevState) => {
      const pd = { ...prevState };
      pd.pageIndex = pageClicked - 1;
      return pd;
    });
  };

  return (
    <React.Fragment>
      <TechModal
        isOpen={showModal}
        company={companyViewed}
        toggleModal={toggleModal}
      />
      <div className="container">
        <form className="form-inline m-2">
          <input
            className="form-control d-flex m-2"
            type="search"
            value={searchTechCo.query}
            onChange={onFormFieldChanged}
            name={"query"}
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-success m-2"
            onClick={onTechCoSearch}
            type="submit"
          >
            Search
          </button>

          <Link
            className="btn btn-success col-3 m-2"
            to={"new"}
            href="#"
            role="button"
          >
            Add Tech Company
          </Link>
        </form>
        <div className="row justify-content-center d-flex">
          <div className="container">
            <div className="row justify-content-center d-flex">
              <Pagination
                className="d-flex justify-content-center rc-pagination"
                total={techCo.totalCount}
                pageSize={techCo.pageSize}
                onChange={onPageChange}
                currentPage={techCo.pageIndex + 1}
                locale={locale}
              />
              {techCo.arrayOfCompanies.map(mapCompanies)}
            </div>
            <Pagination
              className="d-flex justify-content-center rc-pagination"
              total={techCo.totalCount}
              pageSize={techCo.pageSize}
              onChange={onPageChange}
              currentPage={techCo.pageIndex + 1}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TechCo;
