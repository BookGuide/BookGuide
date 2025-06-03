using BookGuideAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Services
{
    public interface IUserContext
    {
        Guid? UserId { get; set; }
        string? Username { get; set; }
        string? Role { get; set; }
        Guid? LibraryId { get; set; }
    }
}
