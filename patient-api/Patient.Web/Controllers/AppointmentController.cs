using Microsoft.AspNetCore.Mvc;
using Patient.Infrastructure;

namespace Patient.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private IAppointmentService _appointment;

        public AppointmentController(IAppointmentService appoinment)
        {
            _appointment = appoinment;
        }

        [HttpGet("Dates")]
        public async Task Dates()
        {
            await _appointment.GetDates();
        }

        [HttpGet("Availability")]
        public Task Availability(int staffId, DateTime date, string slot)
        {
            return _appointment.GetAvailability(staffId, date, slot);
        }

        [HttpPost("Book")]
        public Task Book(int staffId, DateTime date, TimeOnly start)
        {
            return _appointment.Book(staffId, date, start);
        }
    }
}
