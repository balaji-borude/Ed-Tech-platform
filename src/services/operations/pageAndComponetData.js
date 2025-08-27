import { catalogData } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";

export const GetCatalogPageData = async (categoryId) => {
  // console.log("calling API catlogData");

  let result = null; // use null for no data

  const toastId = toast.loading("Loading...");

  try {
    const res = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId,
    });

    // console.log("response catlogPageData $$", res);

    if (!res.data.success) {
      throw new Error(res.data.message || "Could not fetch category page data");
    }

    result = res.data; // assign to outer variable

    // console.log("Print the result of catlogPage Details", result);
  } catch (error) {
    console.log("CATLOG PAGE DATA API ERROR -->", error);
    toast.error(error.response?.data?.message || error.message); // render string
    result = error.response?.data || { success: false, message: error.message };
  }

  toast.dismiss(toastId);
  return result;
};
