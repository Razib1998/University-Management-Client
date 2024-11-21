import {
  TCourse,
  TRegisteredSemesters,
} from "../../../Types/courseManagementType";
import { TQueryParam, TResponseRedux } from "../../../Types/global";
import { basApi } from "../../api/baseApi";

const courseManagementApi = basApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TRegisteredSemesters[]>) => {
        return {
          data: response?.data,
          meta: response.meta,
        };
      },
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    assignFaculties: builder.mutation({
      query: (args) => ({
        url: `courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
    }),
    getFacultiesWithCourse: builder.query({
      query: (id) => ({
        url: `courses/${id}/get-faculties`,
        method: "GET",
      }),
    }),
    addOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAssignFacultiesMutation,
  useGetFacultiesWithCourseQuery,
  useAddOfferedCourseMutation,
} = courseManagementApi;
