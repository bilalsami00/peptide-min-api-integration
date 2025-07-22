// api integration
// AddEditPeptideModal.tsx
import React, { useState, useEffect, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "antd";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx"; 
import dosageService from "@/services/remote/modules/dosage";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import PeptideDropdown from "../PeptideDropDown/PeptideDropDown";
import type { PeptideOption } from "../PeptideDropDown/PeptideDropDown";
import type { CalendarEvent } from "@/app/(dashboard)/Dashboard/dosage-tracking/calender/page";

import "./AddEditPeptideModal.css";

interface AddEditPeptideModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingEvent: CalendarEvent | null;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedPeptide: PeptideOption | null;
  setSelectedPeptide: (peptide: PeptideOption | null) => void;
  dosage: string;
  setDosage: (dosage: string) => void;
  goal: string;
  setGoal: (goal: string) => void;
  // onSuccess: () => void;
  onSuccess: (data: {
    type: "create" | "update";
    event: CalendarEvent;
  }) => void;
}
 
const AddEditPeptideModal: React.FC<AddEditPeptideModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  editingEvent,
  selectedDate,
  setSelectedDate,
  selectedPeptide,
  setSelectedPeptide,
  dosage,
  setDosage,
  goal,
  setGoal,
  onSuccess,
}) => {
  const [pickerValue, setPickerValue] = useState<Dayjs>(dayjs());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  // Use directly
  // await dosageService.createPeptideDosage(data);
  const [authError, setAuthError] = useState<string | null>(null);

  const calendarRef = useRef<HTMLDivElement>(null);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

 
const getUserData = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("peptide_user_token");
  const rawUser = localStorage.getItem("peptide_user");

  if (!token || !rawUser) {
    setAuthError("Authentication required. Please log in.");
    return null;
  }

  try {
    const user = JSON.parse(rawUser);
    return {
      token,        // your JWT
      id: user.id,  // or whatever the user object shape is
      ...user       // any other user fields you need
    };
  } catch {
    setAuthError("Session error. Please log in again.");
    return null;
  }
};


  // Sync header/month view with selectedDate
  useEffect(() => {
    if (selectedDate) {
      setPickerValue(dayjs(selectedDate));
    } else {
      setPickerValue(dayjs());
    }
  }, [selectedDate]);

  

//   const handleSubmit = async () => {
//   if (!isFormValid) return;

//   setIsSubmitting(true);
//   setAuthError(null);

//   const userData = getUserData();
//   if (!userData?.id) {
//     setAuthError("Authentication required. Please log in.");
//     setIsSubmitting(false);
//     return;
//   }

//   // Build the payload exactly as your API expects
//   const payload = {
//     user_id:    userData.id,              // ← include this
//     date:       selectedDate!,
//     peptide_id: selectedPeptide!.id,
//     dosage:     `${dosage}mcg`,           // e.g. "10mcg"
//     goals:      goal,
//   };

//   // 🔥 debug
//   console.log(
//     "[🛠️ UPDATE] PUT →",
//     `/peptide-dosage/update/${editingEvent?.id}`,
//     "payload:", payload
//   );

//   try {
//     let result;
//     if (editingEvent) {
//       const rowId = Number(editingEvent.id);
//       result = await dosageService.updatePeptideDosage(rowId, payload);
//     } else {
//       result = await dosageService.createPeptideDosage(payload);
//     }

//     // Rebuild your CalendarEvent using result.data
//     const saved = result.data;
//     const eventData: CalendarEvent = {
//       id:            saved.id.toString(),
//       date:          saved.date,
//       dateValue:     dayjs(saved.date).format("YYYY-MM-DD"),
//       peptide:       selectedPeptide!,
//       dosage,                          // numeric part only; UI shows "10 mcg"
//       goal,
//       isFDAApproved: selectedPeptide!.tag === "FDA",
//     };

//     onSuccess({
//       type: editingEvent ? "update" : "create",
//       event: eventData,
//     });
//     handleClose();
//   } catch (err: any) {
//     console.error("Submit error:", err);
//     setAuthError("Something went wrong. Please try again.");
//   } finally {
//     setIsSubmitting(false);
//   }
// };
// const handleSubmit = async () => {
//   if (!isFormValid) return;

//   setIsSubmitting(true);
//   setAuthError(null);

//   // 1) grab the current user ID
//   const userData = getUserData();
//   if (!userData?.id) {
//     setAuthError("Authentication required. Please log in.");
//     setIsSubmitting(false);
//     return;
//   }

//   // 2) build payload exactly as your API wants
//   const payload = {
//     user_id:    userData.id,              // REQUIRED by your schema
//     date:       selectedDate!,            // e.g. "2025-07-22"
//     peptide_id: selectedPeptide!.id,      // numeric ID of the peptide
//     dosage:     `${dosage}mcg`,           // must include unit suffix
//     goals:      goal,                     // note: plural "goals"
//   };

//   try {
//     let result: {
//       status: string;
//       message: string;
//       data: {
//         id: number;
//         date: string;
//         peptide_id: number;
//         dosage: string;
//         goals: string;
//         user_id: number;
//         created_at: string;
//         updated_at: string;
//       };
//       statusCode: number;
//     };

//     // 3) choose create vs update
//     if (editingEvent) {
//       // UPDATE
//       const rowId = Number(editingEvent.id);
//       result = await dosageService.updatePeptideDosage(rowId, payload);
//     } else {
//       // CREATE
//       result = await dosageService.createPeptideDosage(payload);
//     }

//     // 4) unwrap the newly saved record
//     const saved = result.data;
//     const eventData: CalendarEvent = {
//       id:            saved.id.toString(),
//       date:          saved.date,
//       dateValue:     dayjs(saved.date).format("YYYY-MM-DD"),
//       peptide:       selectedPeptide!,
//       dosage,                            // numeric part only
//       goal,                              // UI already knows goals
//       isFDAApproved: selectedPeptide!.tag === "FDA",
//     };

//     // 5) pass back up to parent
//     onSuccess({
//       type: editingEvent ? "update" : "create",
//       event: eventData,
//     });

//     handleClose();
//   } catch (err: any) {
//     console.error("Submit error:", err);
//     setAuthError("Something went wrong. Please try again.");
//   } finally {
//     setIsSubmitting(false);
//   }
// };
// const handleSubmit = async () => {
//   // 1) Bail if the form isn’t valid
//   if (!isFormValid) return;

//   setIsSubmitting(true);
//   setAuthError(null);

//   // 2) Grab the logged‑in user
//   const userData = getUserData();
//   if (!userData?.id) {
//     setAuthError("Authentication required. Please log in.");
//     setIsSubmitting(false);
//     return;
//   }

//   // 3) Clean up the dosage string (strip any existing "mcg"/"mg")
//   const numericDosage = dosage.trim().replace(/mg$|mcg$/i, "");
//   const dosagePayload = `${numericDosage}mcg`;

//   // 4) Build exactly the payload the backend expects
//   const payload = {
//     user_id:    userData.id,
//     date:       selectedDate!,            // e.g. "2025-07-22"
//     peptide_id: selectedPeptide!.id,      // numeric
//     dosage:     dosagePayload,            // e.g. "10mcg"
//     goals:      goal,                     // note plural "goals"
//   };

//   try {
//     // 5) Call the service, CREATE vs UPDATE
//     let wrapper: {
//       status: string;
//       message: string;
//       data: {
//         id: number;
//         date: string;
//         peptide_id: number;
//         dosage: string;
//         goals: string;
//         user_id: number;
//         created_at: string;
//         updated_at: string;
//       };
//       statusCode: number;
//     };

//     if (editingEvent) {
//       // UPDATE
//       const rowId = Number(editingEvent.id);
//       wrapper = await dosageService.updatePeptideDosage(rowId, payload);
//     } else {
//       // CREATE
//       wrapper = await dosageService.createPeptideDosage(payload);
//     }

//     // 6) Pull out the saved record
//     const saved = wrapper.data;

//     // 7) Build the CalendarEvent for the parent
//     const eventData: CalendarEvent = {
//       id:            saved.id.toString(),
//       date:          saved.date,
//       dateValue:     dayjs(saved.date).format("YYYY-MM-DD"),
//       peptide:       selectedPeptide!,
//       dosage:        numericDosage,        // just the number part
//       goal,                               // your UI “goal” state
//       isFDAApproved: selectedPeptide!.tag === "FDA",
//     };

//     // 8) Notify the parent
//     onSuccess({
//       type: editingEvent ? "update" : "create",
//       event: eventData,
//     });

//     // 9) Close & reset
//     handleClose();
//   } catch (err: any) {
//     console.error("Submit error:", err);
//     setAuthError("Something went wrong. Please try again.");
//   } finally {
//     setIsSubmitting(false);
//   }
// };
// const handleSubmit = async () => {
//   if (!isFormValid) return;
//   setIsSubmitting(true);
//   setAuthError(null);

//   // 1) grab the user
//   const userData = getUserData();
//   if (!userData?.id) {
//     setAuthError("Authentication required. Please log in.");
//     setIsSubmitting(false);
//     return;
//   }

//   // 2) clean off any mg/mcg suffix
//   const numericDosage = dosage.trim().replace(/mg$|mcg$/i, "");
//   const dosagePayload = `${numericDosage}mg`;    // <-- mg, not mcg

//   // 3) build your payload (matches API)
//   const payload = {
//     user_id:    userData.id,
//     date:       selectedDate!,
//     peptide_id: selectedPeptide!.id,
//     dosage:     dosagePayload,
//     goals:      goal,
//   };

//   console.log("📤 Sending:", payload);

//   try {
//     let wrapper;
//     if (editingEvent) {
//       // UPDATE existing
//       const rowId = Number(editingEvent.id);
//       wrapper = await dosageService.updatePeptideDosage(rowId, payload);
//     } else {
//       // CREATE new
//       wrapper = await dosageService.createPeptideDosage(payload);
//     }

//     // unwrap
//     const saved = wrapper.data;
//     const eventData: CalendarEvent = {
//       id:            saved.id.toString(),
//       date:          saved.date,
//       dateValue:     dayjs(saved.date).format("YYYY‑MM‑DD"),
//       peptide:       selectedPeptide!,
//       dosage:        numericDosage,           // just the number for UI
//       goal,
//       isFDAApproved: selectedPeptide!.tag === "FDA",
//     };

//     onSuccess({
//       type: editingEvent ? "update" : "create",
//       event: eventData,
//     });
//     handleClose();

//   } catch (err: any) {
//     console.error("❌ Submit error:", err);
//     // if the server sent back JSON explaining the 400, let's log it:
//     if (err.response?.data) {
//       console.error("Server replied:", err.response.data);
//     }
//     setAuthError("Something went wrong. Please check the console and try again.");
//   } finally {
//     setIsSubmitting(false);
//   }
// };
const handleSubmit = async () => {
  if (!isFormValid) return;
  setIsSubmitting(true);
  setAuthError(null);

  // ensure we have a token in localStorage (your axiosClient will read it)
  const userData = getUserData();
  if (!userData?.token) {
    setAuthError("Authentication required. Please log in.");
    setIsSubmitting(false);
    return;
  }

  // strip any mg/mcg, then always append mg
  const numericDosage = dosage.trim().replace(/mg$|mcg$/i, "");
  const dosagePayload = `${numericDosage}mg`;

  // **NO** user_id here!
  const payload = {
    date:       selectedDate!,
    peptide_id: selectedPeptide!.id,
    dosage:     dosagePayload,
    goals:      goal,
  };

  console.log("📤 Payload:", payload);

  try {
    // call the right endpoint
    const wrapper = editingEvent
      ? await dosageService.updatePeptideDosage(Number(editingEvent.id), payload)
      : await dosageService.createPeptideDosage(payload);

    const saved = wrapper.data;
    
    // rebuild the calendar event
    const eventData: CalendarEvent = {
      id:            saved.id.toString(),
      date:          saved.date,
      dateValue:     dayjs(saved.date).format("YYYY-MM-DD"),
      peptide:       selectedPeptide!,
      dosage:        numericDosage,
      goal,
      isFDAApproved: selectedPeptide!.tag === "FDA",
    };

    onSuccess({
      type: editingEvent ? "update" : "create",
      event: eventData,
    });

    handleClose();
  } catch (err: any) {
    console.error("❌ Submit error:", err);
    if (err.response?.data) {
      console.error("Server replied:", err.response.data);
    }
    setAuthError("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};




  // Close modal and reset state
  const handleClose = () => {
    setIsModalOpen(false);
    resetFormState();
  };

  // Reset form fields
  const resetFormState = () => {
    setSelectedDate(null);
    setSelectedPeptide(null);
    setDosage("");
    setGoal("");
  };

  // Disable future dates
  const disabledDate = (current: Dayjs) => {
    return current.isAfter(dayjs().endOf("day"));
  };

  // Fixed next month disable logic
  const isNextMonthDisabled = pickerValue
    .add(1, "month")
    .startOf("month")
    .isAfter(dayjs().endOf("day"));

  // Compute years dynamically
  const years = Array.from({ length: 5 }, (_, i) => pickerValue.year() - 4 + i);

  // Update handler to maintain month when changing year
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setPickerValue(pickerValue.year(newYear));
  };

  const handlePrevMonthPicker = () => {
    setPickerValue(pickerValue.subtract(1, "month"));
  };

  const handleNextMonthPicker = () => {
    if (!isNextMonthDisabled) {
      setPickerValue(pickerValue.add(1, "month"));
    }
  };

  // Calculate weeks in current month
  const getWeeksInMonth = () => {
    const firstDay = pickerValue.startOf("month");
    const lastDay = pickerValue.endOf("month");

    // Get starting weekday (0=Sunday, 6=Saturday)
    const firstDayOfWeek = firstDay.day();

    // Get total days in month
    const daysInMonth = lastDay.date();

    // Calculate visible days from previous month
    const daysFromPrevMonth = firstDayOfWeek;

    // Total cells needed in calendar
    const totalCells = daysInMonth + daysFromPrevMonth;

    // Return number of weeks (rows)
    return Math.ceil(totalCells / 7);
  };

  // Update calendar height based on weeks
  const updateCalendarHeight = () => {
    if (!calendarRef.current) return;

    const weeks = getWeeksInMonth();
    const baseHeight = 344; // Base height for 5 weeks
    const rowHeight = 50; // Approx height per week row

    // Calculate new height
    const newHeight =
      weeks > 5 ? baseHeight + (weeks - 5) * rowHeight : baseHeight;

    // Apply to calendar popup
    calendarRef.current.style.height = `${newHeight}px`;
    calendarRef.current.style.minHeight = `${newHeight}px`;
  };

  // Update height when month changes or calendar opens
  useEffect(() => {
    if (isCalendarOpen) {
      // Small delay to allow DOM update
      setTimeout(updateCalendarHeight, 10);
    }
  }, [pickerValue, isCalendarOpen]);

  const isFormValid =
    selectedDate &&
    selectedPeptide &&
    dosage.trim() !== "" &&
    goal.trim() !== "";

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px] relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="txt-32 font-semibold text-[#25292A] mb-4">
            {editingEvent ? "Edit Peptide" : "Add Peptide"}
          </h2>
          <div
            className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer"
            onClick={handleClose}
          >
            <RxCross2 className="text-[#9EA9AA] font-extrabold" />
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <p>Date</p>
              <DatePicker
                allowClear
                open={isCalendarOpen}
                onOpenChange={(open) => {
                  setIsCalendarOpen(open);
                  if (open) setTimeout(updateCalendarHeight, 50);
                }}
                placement="topRight"
                picker="date"
                key={pickerValue.format("YYYY-MM")}
                value={selectedDate ? dayjs(selectedDate) : null}
                format={(val) =>
                  val && selectedDate ? val.format("YYYY-MM-DD") : ""
                }
                onChange={(date) => {
                  if (date) {
                    setSelectedDate(date.format("YYYY-MM-DD"));
                    setPickerValue(date);
                    setIsCalendarOpen(false);
                  } else {
                    setSelectedDate(null);
                    setPickerValue(dayjs());
                  }
                }}
                defaultPickerValue={pickerValue}
                inputReadOnly
                className="w-full h-auto 2xl:w-[448px] xl:h-[48px] !bg-[#F2F5F6] rounded-md px-3 py-2"
                rootClassName="custom-datepicker-input"
                suffixIcon={
                  <Image
                    src="/Dashboard/dosage-tracking/calendarIcon.svg"
                    alt="calendar"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                }
                popupClassName="custom-datepicker-dropdown no-header-datepicker"
                disabledDate={disabledDate}
                panelRender={(panelNode) => (
                  <div
                    className="custom-panel-container"
                    ref={calendarRef}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div
                      className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-1 relative">
                        <span className="txt-16">
                          {pickerValue.format("MMMM")}
                        </span>
                        <div className="relative flex items-center">
                          <select
                            onMouseDown={(e) => e.preventDefault()}
                            value={pickerValue.year()}
                            onChange={handleYearChange}
                            className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6"
                          >
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <IoMdArrowDropdown
                            className="absolute right-0 pointer-events-none text-[#626D6F]"
                            size={16}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePrevMonthPicker();
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                        >
                          <MdKeyboardArrowLeft size={24} />
                        </button>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNextMonthPicker();
                          }}
                          disabled={isNextMonthDisabled}
                          className={`w-8 h-8 flex items-center justify-center rounded-full ${
                            isNextMonthDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <MdKeyboardArrowRight
                            size={24}
                            className={
                              isNextMonthDisabled ? "text-gray-400" : ""
                            }
                          />
                        </button>
                      </div>
                    </div>
                    {panelNode}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="relative">
            <p>Peptide</p>
            <PeptideDropdown
              selected={selectedPeptide}
              setSelected={setSelectedPeptide}
            />
          </div>

          <div className="relative">
            <p>Dosage</p>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter dosage you have taken"
                className="w-full h-auto 2xl:w-[448px] xl:h-[48px] bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent font-medium placeholder:font-normal placeholder:text-[#8D9A9B] rounded-md px-4 py-2 pr-12"
                value={dosage}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^\d+$/.test(value)) {
                    setDosage(value);
                  }
                }}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8D9A9B]">
                mcg
              </span>
            </div>
          </div>

          <div className="relative">
            <p>Goal</p>
            <textarea
              placeholder="Write your primary goal"
              className="w-full 2xl:w-[448px] h-[100px] font-medium placeholder:font-normal bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-[#8D9A9B] rounded-md px-4 py-2 resize-none"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            ></textarea>
          </div>

          {/* Add error display near the submit button */}
          {authError && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {authError}
            </div>
          )}

          <button
            className={`txt-18 font-semibold leading-none text-center px-4 py-4 rounded-full w-full ${
              isFormValid && !isSubmitting
                ? "bg-[#224674] !text-white cursor-pointer"
                : "bg-[#D8DFE0] !text-[#8D9A9B] cursor-not-allowed"
            }`}
            disabled={!isFormValid || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Processing..." : editingEvent ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditPeptideModal;

// function getFDAStatus(tag: string) {
//   throw new Error("Function not implemented.");
// }
const getFDAStatus = (tag: string): boolean => tag === "FDA";
