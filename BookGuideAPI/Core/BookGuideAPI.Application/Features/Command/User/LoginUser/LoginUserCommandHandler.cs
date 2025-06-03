using BookGuideAPI.Application.Helper;
using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.ViewModel;
using MediatR;

namespace BookGuideAPI.Application.Features.Command.User.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResponse>
    {
        private readonly IUserReadRepository _userReadRepository;
        private readonly TokenService _tokenService;
        private readonly HashPassword _hashPassword;

        public LoginUserCommandHandler(IUserReadRepository userReadRepository, TokenService tokenService, HashPassword hashPassword)
        {
            _userReadRepository = userReadRepository;
            _tokenService = tokenService;
            _hashPassword = hashPassword;
        }

        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {
            var user = await _userReadRepository.CheckLoginCredentialsAsync(request.Username);

            if (user == null)
            {
                return new LoginUserCommandResponse
                {
                    Succeeded = false,
                };
            }

            if (!(await _hashPassword.VerifyPasswordAsync(request.RawPassword, user.HashedPassword))) return new LoginUserCommandResponse { Succeeded = false };

            var token = _tokenService.GenerateToken(user.Id, user.Username, user.Role);

            var currentUser = new CurrentUserViewModel
            {
                Username = user.Username,
                Email = user.Email,
                Role = user.Role
            };

            return new LoginUserCommandResponse
            {
                Succeeded = true,
                Token = token,
                User = currentUser
            };
        }
    }
}
