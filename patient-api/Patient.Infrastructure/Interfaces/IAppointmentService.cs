namespace Patient.Infrastructure
{
    public interface IAppointmentService
    {
        Task GetDates();
        Task GetAvailability(int staffId, DateTime date, string slot);
        Task Book(int staffId, DateTime date, TimeOnly start); 
    }
}
