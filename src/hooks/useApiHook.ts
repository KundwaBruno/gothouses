import { useState, useEffect } from "react";
import axios from "../utils/axios";

export type TApiResponse = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
};

export const useApiGet = (url: string): TApiResponse => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>("");
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAPIData = async () => {
      setLoading(true);
      try {
        const apiResponse = await axios.get(url);
        setStatus(apiResponse.status);
        setStatusText(apiResponse.statusText);
        setData(apiResponse.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getAPIData();
  }, [url]);

  return { status, statusText, data, error, loading };
};
