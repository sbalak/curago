namespace CuraGo.Models
{
    public class Staff
    {
        public int Id { get; set; }
        public int PrimarySpecialityId { get; set; }
        public int? SecondarySpecialityId { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Image { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public decimal Fee { get; set; }
        public int Experience { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        public string? Otp { get; set; }
        public DateTime? OtpExpiry { get; set; }

        public Speciality PrimarySpeciality { get; set; }
        public Speciality? SecondarySpeciality { get; set; }
    }
}
