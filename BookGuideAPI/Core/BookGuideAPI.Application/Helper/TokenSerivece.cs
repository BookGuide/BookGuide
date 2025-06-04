using BookGuideAPI.Application.Dtos.Token;
using BookGuideAPI.Domain.Entities;
using BookGuideAPI.Domain.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.Helper
{
    public class TokenService
    {
        private readonly TokenOptions _options;

        public TokenService(IOptions<TokenOptions> options)
        {
            _options = options.Value;
        }

        public string GenerateToken(Guid userId, string username, User_Role role, Guid libraryId)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role.ToString()),
            new Claim("library_id", libraryId.ToString())
        };

            var token = new JwtSecurityToken(
                issuer: _options.Issuer,
                expires: DateTime.UtcNow.AddMinutes(_options.ExpireMinutes),
                signingCredentials: creds,
                claims: claims);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
