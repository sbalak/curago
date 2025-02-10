using Microsoft.AspNetCore.Mvc;
using Patient.Infrastructure;

namespace Patient.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferenceController : ControllerBase
    {
        private IReferenceService _reference;

        public ReferenceController(IReferenceService reference)
        {
            _reference = reference;
        }

        [HttpGet("Specialities")]
        public async Task<List<SpecialityModel>> Specialities()
        {
            return await _reference.GetSpecialities();
        }

        [HttpGet("Symptoms")]
        public async Task<List<SymptomModel>> Symptoms()
        {
            return await _reference.GetSymptoms();
        }
    }
}
