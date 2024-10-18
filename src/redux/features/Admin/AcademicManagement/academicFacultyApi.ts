import { basApi } from "../../../api/baseApi";

const academicFacultyApi = basApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicFaculty: builder.query({
      query: () => {
        // const params = new URLSearchParams();

        // if (args) {
        //   args.forEach((item: TQueryParam) => {
        //     params.append(item.name, item.value as string);
        //   });
        // }

        return {
          url: "/academic-semesters",
          method: "GET",
        };
      },
      //   transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
      //     return {
      //       data: response?.data,
      //       meta: response.meta,
      //     };
      //   },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddAcademicFacultyMutation, useGetAllAcademicFacultyQuery } =
  academicFacultyApi;
