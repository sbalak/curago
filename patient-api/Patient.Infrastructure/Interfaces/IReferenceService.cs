namespace Patient.Infrastructure
{
    public interface IReferenceService
    {
        Task<List<SpecialityModel>> GetSpecialities();
        Task<List<SymptomModel>> GetSymptoms();
    }
}
