using Microsoft.EntityFrameworkCore;
using Patient.Data;

namespace Patient.Infrastructure
{
    public class StaffService : IStaffService
    {
        private readonly PatientContext _context;

        public StaffService(PatientContext context)
        {
            _context = context;
        }

        #region Query for GetStaffs

        /*

        	@query nvarchar(MAX) = '',
	        @latpoint float = 0,
	        @longpoint float = 0,
	        @offset int = 0,
	        @fetch int = 10
        
            SELECT [Id], [Email], [Phone], [FirstName], [LastName], ROUND([Distance], 2) AS [Distance]
            FROM (
                SELECT  z.[Id], z.[Email], z.[Phone], z.[FirstName], z.[LastName], p.[Radius],
		                    p.[DistanceUnit]
			                * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(p.[LatPoint]))
                            * COS(RADIANS(z.[Latitude]))
                            * COS(RADIANS(p.[LongPoint] - z.[Longitude]))
                            + SIN(RADIANS(p.[LatPoint]))
                            * SIN(RADIANS(z.[Latitude]))))) AS [Distance]
                FROM [Staffs] AS z
                JOIN (
	                SELECT @latpoint AS [LatPoint], 
	                        @longpoint AS [LongPoint],
		                    50.0 AS [Radius],
		                    111.045 AS [DistanceUnit]
                ) AS p ON 1=1
                WHERE z.[Latitude] BETWEEN p.[LatPoint] - (p.[Radius] / p.[DistanceUnit]) AND 
                                            p.[LatPoint] + (p.[Radius] / p.[DistanceUnit]) AND
	                    z.[Longitude] BETWEEN p.[LongPoint] - (p.[Radius] / (p.[DistanceUnit] * COS(RADIANS(p.[LatPoint])))) AND 
						                    p.[LongPoint] + (p.[Radius] / (p.[DistanceUnit] * COS(RADIANS(p.[LatPoint]))))
            ) AS d
            WHERE [Distance] <= [Radius] AND [Phone] LIKE '%' + @query + '%'
            ORDER BY [Distance]
            OFFSET @offset ROWS 
            FETCH NEXT @fetch ROWS ONLY

         */

        #endregion

        public async Task<List<StaffModel>> GetStaffs(double latitude, double longitude, string? query = "", int? page = 1, int? pageSize = 10)
        {
            int offset = (Convert.ToInt32(page) - 1) * Convert.ToInt32(pageSize);
            int fetch = Convert.ToInt32(page) * Convert.ToInt32(pageSize);

            var staffs = await _context.Database.SqlQuery<StaffModel>($"EXEC [dbo].[GetStaffs] @latpoint={latitude}, @longpoint = {longitude}, @query = {query}, @offset = {offset}, @fetch = {fetch};").ToListAsync();
            return staffs;
        }

        #region Query for GetStaff

        /*
        
            @staff int = null,
	        @latpoint float = 0,
            @longpoint float = 0

            SELECT z.[Id], z.[Email], z.[Phone], z.[FirstName], z.[LastName],
	            ROUND(p.[DistanceUnit]
		            * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(p.[LatPoint]))
		            * COS(RADIANS(z.[Latitude]))
		            * COS(RADIANS(p.[LongPoint] - z.[Longitude]))
		            + SIN(RADIANS(p.[LatPoint]))
		            * SIN(RADIANS(z.[Latitude]))))), 2) AS [Distance]
            FROM [Staffs] AS z
            JOIN (
	            SELECT @latpoint AS [LatPoint], 
		            @longpoint AS [LongPoint],
		            50.0 AS [Radius],
		            111.045 AS [DistanceUnit]
            ) AS p ON 1=1
            WHERE z.Id = @staff

         */


        #endregion

        public async Task<StaffModel> GetStaff(int staffId, double latitude, double longitude)
        {
            var staff = _context.Database.SqlQuery<StaffModel>($"EXEC [dbo].[GetStaff] @staff={staffId}, @latpoint={latitude}, @longpoint = {longitude};").AsEnumerable().FirstOrDefault();
            return staff;
        }
    }
}
