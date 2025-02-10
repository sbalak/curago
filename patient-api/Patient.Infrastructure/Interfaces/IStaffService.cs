namespace Patient.Infrastructure
{
    public interface IStaffService
    {
        Task<List<StaffModel>> GetStaffs(double latitude, double longitude, string? query = "", int? page = 1, int? pageSize = 10);
        Task<StaffModel> GetStaff(int staffId, double latitude, double longitude);
    }
}
