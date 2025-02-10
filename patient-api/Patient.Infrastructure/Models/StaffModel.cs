namespace Patient.Infrastructure
{
    public class StaffModel
    {
        public int Id { get; set; }
        public string PrimarySpeciality { get; set; }
        public string PrimaryRole { get; set; }
        public string? SecondarySpeciality { get; set; }
        public string? SecondaryRole { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public double Distance { get; set; }
    }
}
