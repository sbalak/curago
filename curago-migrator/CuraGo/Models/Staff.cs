namespace CuraGo.Models
{
    public class Staff
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        public string? Otp { get; set; }
        public DateTime? OtpExpiry { get; set; }
    }

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

    public class StaffSpeciality
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public int SpecialityId { get; set; }
        public Staff Staff { get; set; }
        public Speciality Speciality { get; set; }
    }

    public class StaffSymptom
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public int SymptomId { get; set; }
        public Staff Staff { get; set; }
        public Symptom Symptom { get; set; }
    }
}
