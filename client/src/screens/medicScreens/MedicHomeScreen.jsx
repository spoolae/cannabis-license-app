import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLicenses } from "../../redux/licensesSlice";

import { AddLicenseCard } from "../../components/AddLicenseCard";
import { MedicHeader } from "../../components/MedicHeader";

export const MedicHomeScreen = () => {
  const dispatch = useDispatch();
  const licenses = useSelector((state) => state.licenses.licenses);
  const error = useSelector((state) => state.licenses.error);

  useEffect(() => {
    // Вызов экшена для загрузки списка лицензий при монтировании компонента
    dispatch(fetchLicenses());
  }, [dispatch]);

  useEffect(() => {
    // Вывод списка лицензий в консоль
    console.log("Licenses:", licenses);

    // Вывод ошибки, если есть
    if (error) {
      console.error("Error fetching licenses:", error);
    }
  }, [licenses, error]);

  return (
    <div className="home-screen">
      <MedicHeader />
      <div className="add-license-card-container">
        <AddLicenseCard />
      </div>
    </div>
  );
};
