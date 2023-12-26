import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLicense, fetchLicenses } from "../redux/licensesSlice";

const useLicenses = () => {
  const dispatch = useDispatch();
  const licenses = useSelector((state) => state.licenses.licenses);
  const error = useSelector((state) => state.licenses.error);

  const removeLicense = (licenseId) => {
    dispatch(deleteLicense(licenseId));
  };

  useEffect(() => {
    dispatch(fetchLicenses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching licenses:", error);
    }
  }, [error]);

  return { licenses, error, removeLicense };
};

export default useLicenses;
