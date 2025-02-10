using Microsoft.AspNetCore.Mvc;
using Patient.Infrastructure;

namespace Patient.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private IStaffService _staff;

        public StaffController(IStaffService staff)
        {
            _staff = staff;
        }

        [HttpGet("Details")]
        public async Task<StaffModel> Details(int staffId, double latitude, double longitude)
        {
            return await _staff.GetStaff(staffId, latitude, longitude);
        }

        [HttpGet("List")]
        public async Task<List<StaffModel>> List(double latitude, double longitude, string? query = "", int? page = 1, int? pageSize = 10)
        {
            return await _staff.GetStaffs(latitude, longitude, query, page, pageSize);
        }
    }
}
