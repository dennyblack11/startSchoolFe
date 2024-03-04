import { FC, useEffect, useState } from "react";
import Chart from "./Chart";
import GetAnnouncement from "./GetAnnouncement";

import moment from "moment";
import lodash from "lodash";
import {
  useClassTimeTableViewer,
  useReadMyClassInfoData,
  useStudentInfo,
} from "../../hooks/useStudentHook";
import { readClassInfo } from "../../api/studentAPI";
import { useClassTimeTable } from "../../../pagesForTeachers/hooks/useTeacher";

const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Personal: FC = () => {
  const { studentInfo } = useStudentInfo();

  const { state } = useReadMyClassInfoData(studentInfo?.classAssigned);
  const { viewTimeTable } = useClassTimeTableViewer(state?._id);

  const data = Object.values(lodash.groupBy(viewTimeTable, "day"));

  return (
    <div>
      <div className="mb-2 text-blue-950">
        <p className="font-bold"></p>

        {/* start */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="border rounded-md min-h-[130px] p-2 pb-0 ">
            <p className="font-medium leading-tight">Number of Students:</p>
            <div className="mt-5" />
            <div className="flex items-end gap-2 ">
              <h1 className="text-[60px] md:text-[70px] font-medium mb-0 leading-none">
                {state?.students?.length}
              </h1>{" "}
              <span className="mb-1 font-medium text-[15px] -ml-2">
                students
              </span>
            </div>
          </div>

          <div className="border rounded-md min-h-[130px] p-2 pb-0 ">
            <p className="font-medium leading-tight">Number of Subjects:</p>
            <div className="mt-5" />
            <div className="flex items-end gap-2 ">
              <h1 className="text-[60px] md:text-[70px] font-medium mb-0 leading-none">
                {state?.classSubjects?.length}
              </h1>{" "}
              <span className="mb-1 font-medium text-[15px] -ml-2">
                Subjects
              </span>
            </div>
          </div>
        </div>
        {/* end */}
      </div>
      <div className="border-t my-5" />

      <div className="w-full min-h-[130px] bg-blue-950 rounded-lg mt-1 text-white p-3">
        <p className="text-[20px] mb-2">Announcement/Event</p>
        <GetAnnouncement />
      </div>

      <div className="w-full min-h-[130px] border bg-blue-900 rounded-lg text-white p-3 mt-5  overflow-x-auto relative">
        <div className="sticky z-20 top-0 left-0">
          <p className="text-[20px] mb-2">My Today's class Schedule</p>
          <p className="text-[20px] font-bold -mt-3">
            {day[moment(Date.now()).day()]}
          </p>
        </div>

        <div className="flex mt-5 w-full mr-5">
          {data?.map((props: any, i: number) => (
            <div
              key={i}
              className={`
                flex flex-col py-2 my-0 
                `}
            >
              <div className="flex gap-4 mr-5">
                {props?.map((props: any, e: number) => (
                  <div
                    key={e}
                    className="flex"
                    onClick={() => {
                      console.log(props);
                    }}
                  >
                    {props?.day === day[moment(Date.now()).day()] && (
                      <div className="flex gap-4">
                        <div className=" h-[170px] flex justify-center items-center rounded-lg flex-col w-[200px] text-blue-950 bg-white border">
                          <p>{props?.subject}</p>
                          <p>{props?.time}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t my-5" />
      <div className="w-full">
        <p>Chart</p>

        <Chart />

        <p className="text-[12px]">Male vs Female</p>
      </div>
    </div>
  );
};

export default Personal;
