import axios from "axios";

export const fetchSpecialities = async () => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/reference/specialities`
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    return [];
  }
};
