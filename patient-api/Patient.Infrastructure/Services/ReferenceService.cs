using Microsoft.EntityFrameworkCore;
using Patient.Data;

namespace Patient.Infrastructure
{
    public class ReferenceService : IReferenceService
    {
        private readonly PatientContext _context;

        public ReferenceService(PatientContext context)
        {
            _context = context;
        }

        public async Task<List<SpecialityModel>> GetSpecialities()
        {
            var specialities = await _context.Specialities
                                             .Select(m => new SpecialityModel
                                                {
                                                    Id = m.Id,
                                                    Name = m.Name,
                                                    Image = m.Image,
                                                    Description = m.Description
                                                })
                                             .ToListAsync();
            return specialities;
        }

        public async Task<List<SymptomModel>> GetSymptoms()
        {
            var symptoms = await _context.Symptoms
                                         .Select(m => new SymptomModel
                                             {
                                                 Id = m.Id,
                                                 Name = m.Name,
                                                 Image = m.Image,
                                                 Description = m.Description
                                             })
                                         .ToListAsync();
            return symptoms;
        }
    }
}
