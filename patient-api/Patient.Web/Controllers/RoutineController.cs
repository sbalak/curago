using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Patient.Data;
using Patient.Infrastructure;
using System;
using System.ComponentModel.DataAnnotations;

namespace Patient.Web.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class RoutineController : ControllerBase
    {
        private PatientContext _context;

        public RoutineController(PatientContext context)
        {
            _context = context;
        }

        [HttpGet("CreateAppointments")]
        public async Task<List<Appointment>> CreateAppointments()
        {
            try
            {
                // create a flag new onboards to auto-generate appointments
                var staff = await _context.Staffs.Where(m => m.Id == 2).FirstOrDefaultAsync(); //var staffs = await _context.Staffs.ToListAsync();
                var cutOff = new TimeOnly(13, 00, 00);

                //foreach (var staff in staffs)
                //{
                var availabilities = await _context.Availabilities.ToListAsync();
                List<Appointment> appointments = new List<Appointment>();
                DateTime appointmentDate = DateTime.Now.Date;

                for (int x = 1; x <= 7; x++)
                {
                    appointmentDate = appointmentDate.AddDays(1);
                    var presentDayAvailabilties = availabilities.Where(m => m.Day == appointmentDate.DayOfWeek.ToString()).OrderBy(m => m.Slot).ToList();

                    foreach (var presentDayAvailability in presentDayAvailabilties)
                    {
                        List<TimeSpan> appointmentStartTimes = new List<TimeSpan>();

                        for (int y = 0; y < 4; y++)
                        {
                            TimeSpan appointmentStartTime = TimeSpan.FromHours(presentDayAvailability.Start.AddHours(y).Hour);
                            appointmentStartTimes.Add(appointmentStartTime);
                        }

                        foreach (var appointmentStartTime in appointmentStartTimes)
                        {
                            Appointment appointment = new Appointment();
                            DateTime appointmentStart = appointmentDate.Add(appointmentStartTime);

                            appointment.StaffId = staff.Id;
                            appointment.Slot = presentDayAvailability.Start < cutOff ? "am" : "pm";
                            appointment.Start = appointmentStart;
                            appointment.End = appointmentStart.AddHours(1);
                            appointment.IsAvailable = true;

                            appointments.Add(appointment);
                        }
                    }
                }
                //}

                return appointments.OrderBy(m => m.Start).ToList();
            } 
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("ParseAppointments")]
        public async Task<List<AppointmentModel>> ParseAppointments()
        {
            try
            {
                // create a flag new onboards to auto-generate appointments
                var staff = await _context.Staffs.Where(m => m.Id == 2).FirstOrDefaultAsync(); //var staffs = await _context.Staffs.ToListAsync();
                var cutOff = new TimeOnly(13, 00, 00);

                //foreach (var staff in staffs)
                //{
                var availabilities = await _context.Availabilities.ToListAsync();
                List<Appointment> appointments = new List<Appointment>();
                DateTime appointmentDate = DateTime.Now.Date;

                for (int x = 1; x <= 7; x++)
                {
                    appointmentDate = appointmentDate.AddDays(1);
                    var presentDayAvailabilties = availabilities.Where(m => m.Day == appointmentDate.DayOfWeek.ToString()).OrderBy(m => m.Slot).ToList();

                    foreach (var presentDayAvailability in presentDayAvailabilties)
                    {
                        List<TimeSpan> appointmentStartTimes = new List<TimeSpan>();

                        for (int y = 0; y < 4; y++)
                        {
                            TimeSpan appointmentStartTime = TimeSpan.FromHours(presentDayAvailability.Start.AddHours(y).Hour);
                            appointmentStartTimes.Add(appointmentStartTime);
                        }

                        foreach (var appointmentStartTime in appointmentStartTimes)
                        {
                            Appointment appointment = new Appointment();
                            DateTime appointmentStart = appointmentDate.Add(appointmentStartTime);

                            appointment.StaffId = staff.Id;
                            appointment.Slot = presentDayAvailability.Start < cutOff ? "am" : "pm";
                            appointment.Start = appointmentStart;
                            appointment.End = appointmentStart.AddHours(1);
                            appointment.IsAvailable = true;

                            appointments.Add(appointment);
                        }
                    }
                }
                //}

                List<AppointmentModel> list = new List<AppointmentModel>();

                List<AppointmentDate> appointmentDates = new List<AppointmentDate>();

                var distinctDates = appointments.Select(m => m.Start.Date).Distinct();

                foreach (var distinctDate in distinctDates)
                {
                    AppointmentModel item = new AppointmentModel();
                    List<AppointmentAvailabilitiy> appointmentAvailabilities = new List<AppointmentAvailabilitiy>();
                    AppointmentDate newAppointmentDate = new AppointmentDate()
                    {
                        Date = distinctDate.Date.ToString("dd/MM/yyyy")
                    };
                    var distinctDateAppointments = appointments.Where(m => m.Start.Date == distinctDate).OrderBy(m => m.Start).ToList();

                    foreach (var distinctDateAppointment in distinctDateAppointments)
                    {
                        AppointmentAvailabilitiy appointmentAvailability = new AppointmentAvailabilitiy()
                        {
                            Slot = distinctDateAppointment.Slot,
                            Start = distinctDateAppointment.Start.Hour.ToString(),
                            End = distinctDateAppointment.End.Hour.ToString(),
                            IsAvailable = distinctDateAppointment.IsAvailable
                        };

                        appointmentAvailabilities.Add(appointmentAvailability);
                    }

                    item.Date = newAppointmentDate;
                    item.Availabilities = appointmentAvailabilities;

                    list.Add(item);
                }


                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }

    public class AppointmentModel
    {
        public AppointmentDate Date { get; set; }
        public List<AppointmentAvailabilitiy> Availabilities { get; set; }
    }

    public class AppointmentDate
    {
        public string Date { get; set; }
    }

    public class AppointmentAvailabilitiy
    {
        public string Slot { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public bool IsAvailable { get; set; }
    }

}
