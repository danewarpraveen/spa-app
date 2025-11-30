"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCardsData, bookingAppointment } from "../components/redux/slicess/ProductSlice";
import { getFromLocalStorage } from "../components/helper/loacalSorage";

import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Grid, Card, Button,
  CardContent, Typography, Divider
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SnackBarComponent from "../components/sanckBarCom/SnackBarCompoent";
import dayjs from "dayjs";


export default function BillPage() {

  const dispatch = useDispatch<any>();
  const [billData, setBillData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [snackBarobj, setsnackBarobj] = useState({
    open: false,
    message: ""
  });

  useEffect(() => {
    async function fetchData() {
      dispatch(getCardsData(getFromLocalStorage("user")))
        .then((res: any) => setBillData(res.payload || []))
        .finally(() => setIsLoading(false));
    }
    fetchData();
  }, []);

  const ConfirmBooking = () => {
    const user = getFromLocalStorage("user");
    const servicesNames = billData.map((i: any) => i.s_name);

    dispatch(
      bookingAppointment({
        user: user,
        order: {
          userName: user,
          appointmentTime: selectedTime,
          appointmentDate: selectedDate,
          services: servicesNames
        }
      })
    ).then((res: any) => {
      setsnackBarobj({
        open: true,
        message: res.payload ? "Appointment Booked Successfully!" : "Booking Failed"
      });
    });
  };


  return (
    <div style={{ padding: "70px", minHeight: "100vh" }}>

      {/* Page Header */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
        Billing & Appointment
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 4, color: "gray" }}>
        Review your services and confirm your appointment slot.
      </Typography>


      <Grid container spacing={4}>

        {/* Left Table */}
        <Grid >
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 5 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Selected Services
            </Typography>

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>

                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell align="center"><strong>No</strong></TableCell>
                      <TableCell><strong>Service Name</strong></TableCell>
                      <TableCell align="right"><strong>Price</strong></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {billData?.map((row: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell>{row.s_name}</TableCell>
                        <TableCell align="right">₹{row.s_cost}</TableCell>
                      </TableRow>
                    ))}

                    {/* Total */}
                    <TableRow>
                      <TableCell colSpan={2} align="right">
                        <strong>Total Cost</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>
                          ₹{billData?.reduce((t: number, i: any) => t + i.s_cost, 0)}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>

                </Table>
              </TableContainer>
            )}
          </Card>
        </Grid>

        {/* Right Side Booking Form */}
        <Grid >
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 5 }}>
            <CardContent>

              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Book Your Appointment
              </Typography>

              {/* Date Picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Appointment Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  sx={{ width: "100%" }}
                  disablePast
                />
              </LocalizationProvider>

              {/* Time Slots */}
              <Typography sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
                Choose Time Slot
              </Typography>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "contained" : "outlined"}
                    onClick={() => setSelectedTime(time)}
                    sx={{ borderRadius: "20px", textTransform: "none" }}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              {/* Confirm Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3, py: 1.3 }}
                disabled={!selectedDate || !selectedTime}
                onClick={ConfirmBooking}
              >
                Confirm Appointment
              </Button>

            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Need Help?
            </Typography>

            <Typography sx={{ mt: 1, color: "gray" }}>
              If you need help with your booking, contact our support team.
            </Typography>

            <Typography sx={{ mt: 2 }}>
              📞 <strong>+91 98765 43210</strong>
            </Typography>

            <Typography>
              📧 support@massagecenter.com
            </Typography>
          </Card>
        </Grid>

      </Grid>

      {/* Snackbar */}
      <SnackBarComponent snackBarobj={snackBarobj} setsnackBarobj={setsnackBarobj} />

    </div>
  );
}
