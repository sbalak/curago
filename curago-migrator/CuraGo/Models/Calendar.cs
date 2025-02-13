namespace CuraGo.Models
{
    public class Availability
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public string Day { get; set; }
        public string Slot { get; set; }
        public TimeOnly Start { get; set; }
        public TimeOnly End { get; set; }
        public bool IsAvailable { get; set; }
        public Staff Staff { get; set; }
    }

    public class Appointment
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public string Slot { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAvailable { get; set; }
        public Staff Staff { get; set; }
    }

    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AppointmentId { get; set; }
        public User User { get; set; }
        public Appointment Appointment { get; set; }
    }
}
