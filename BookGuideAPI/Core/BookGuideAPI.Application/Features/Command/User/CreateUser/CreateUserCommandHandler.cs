using BookGuideAPI.Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.User.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, CreateUserCommandResponse>
    {
        readonly IUserWriteRepository _userWriteRepository;
        readonly IUserReadRepository _userReadRepository;
        public CreateUserCommandHandler(IUserReadRepository userReadRepository, IUserWriteRepository userWriteRepository)
        {
            _userReadRepository = userReadRepository;
            _userWriteRepository = userWriteRepository;
        }
        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
            if (await _userReadRepository.ChechkUsernameAndEmailAsync(request.Username, request.Email)) return new CreateUserCommandResponse
            {
                Succeeded = false,
            };

            // TODO: Add HashPassword 

            await _userWriteRepository.AddAsync(new Domain.Entities.User
            {
                Username = request.Username,
                CreatedAt = DateTime.UtcNow,
                Email = request.Email,
                Id = Guid.NewGuid(),
                Role = Domain.Enums.User_Role.Normal,
                HashedPassword = request.RawPassword,
            });

            var response = await _userWriteRepository.SaveChangesAsync();

            return new CreateUserCommandResponse
            {
                Succeeded = true,
            };
        }
    }
}
