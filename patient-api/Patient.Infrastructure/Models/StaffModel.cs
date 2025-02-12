namespace Patient.Infrastructure
{
    public class StaffModel
    {
        public int Id { get; set; }
        public string Speciality { get; set; }
        public string Role { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Image { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public decimal Fee { get; set; }
        public int Experience { get; set; }
        //public string? Availability { get; set; }
        public double Distance { get; set; }
    }
}
