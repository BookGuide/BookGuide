using BookGuideAPI.Application.Services;
using System.Security.Claims;

namespace BookGuideAPI.API.Middleware
{
    public class UserContextMiddleware
    {
        private readonly RequestDelegate _next;

        public UserContextMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IUserContext userContext)
        {
            var user = context.User;

            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var userId))
            {
                userContext.UserId = userId;
            }

            var usernameClaim = user.FindFirst(ClaimTypes.Name);
            if (usernameClaim != null)
            {
                userContext.Username = usernameClaim.Value;
            }

            var roleClaim = user.FindFirst(ClaimTypes.Role);
            if (roleClaim != null)
            {
                userContext.Role = roleClaim.Value;
            }

            var libraryIdClaim = user.FindFirst("library_id");
            if (libraryIdClaim != null && Guid.TryParse(libraryIdClaim.Value, out var libraryId))
            {
                userContext.LibraryId = libraryId;
            }

            await _next(context);
        }
    }
}
