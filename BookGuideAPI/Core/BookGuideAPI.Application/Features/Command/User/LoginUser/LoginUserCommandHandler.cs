using BookGuideAPI.Application.Repositories;
using BookGuideAPI.Application.ViewModel;
using MediatR;

namespace BookGuideAPI.Application.Features.Command.User.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResponse>
    {
        private readonly IUserReadRepository _userReadRepository;

        public LoginUserCommandHandler(IUserReadRepository userReadRepository)
        {
            _userReadRepository = userReadRepository;
        }

        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {
            var hashedPassword = request.RawPassword;

            var user = await _userReadRepository.CheckLoginCredentialsAsync(request.Username, hashedPassword);

            if (user == null)
            {
                return new LoginUserCommandResponse
                {
                    Succeeded = false,
                };
            }

            var token = "blabla";

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
