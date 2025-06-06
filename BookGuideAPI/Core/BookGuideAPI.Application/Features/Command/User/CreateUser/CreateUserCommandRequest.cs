using BookGuideAPI.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Features.Command.User.CreateUser
{
    public class CreateUserCommandRequest : IRequest<CreateUserCommandResponse>
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string RawPassword { get; set; }
        public required User_Role User_Role { get; set; }
        public string? LibraryName { get; set; }
    }
}