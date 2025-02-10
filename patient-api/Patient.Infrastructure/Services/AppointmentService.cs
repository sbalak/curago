using Microsoft.EntityFrameworkCore;
using Patient.Data;

namespace Patient.Infrastructure
{
    public class AppointmentService : IAppointmentService
    {
        private readonly PatientContext _context;

        public AppointmentService(PatientContext context)
        {
            _context = context;
        }

        public Task GetDates()
        {
            throw new NotImplementedException();
        }

        public Task GetAvailability(int staffId, DateTime date, string slot)
        {
            throw new NotImplementedException();
        }

        public Task Book(int staffId, DateTime date, TimeOnly start)
        {
            throw new NotImplementedException();
        }
    }
}
