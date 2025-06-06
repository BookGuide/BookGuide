using BookGuideAPI.Application.Helper;
using BookGuideAPI.Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel;
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
        readonly HashPassword _hashPassword;
        readonly ILibraryReadRepository _libraryReadRepository;
        public CreateUserCommandHandler(IUserReadRepository userReadRepository, IUserWriteRepository userWriteRepository, HashPassword hashPassword, ILibraryReadRepository libraryReadRepository)
        {
            _userReadRepository = userReadRepository;
            _userWriteRepository = userWriteRepository;
            _hashPassword = hashPassword;
            _libraryReadRepository = libraryReadRepository;
        }
        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
            if (await _userReadRepository.ChechkUsernameAndEmailAsync(request.Username, request.Email)) return new CreateUserCommandResponse
            {
                Succeeded = false,
            };

            var library = await _libraryReadRepository.GetLibraryIdByNameAsync(request.LibraryName);
            await _userWriteRepository.AddAsync(new Domain.Entities.User
            {
                Username = request.Username,
                CreatedAt = DateTime.UtcNow,
                Email = request.Email,
                Id = Guid.NewGuid(),
                Role = request.User_Role,
                HashedPassword = await _hashPassword.HashPasswordAsync(request.RawPassword),
                LibraryId = library.Id,
            });

            var response = await _userWriteRepository.SaveChangesAsync();

            return new CreateUserCommandResponse
            {
                Succeeded = true,
            };
        }
    }
}