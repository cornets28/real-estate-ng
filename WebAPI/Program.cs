var builder = WebApplication.CreateBuilder(args);
var apiCorsPolicy = "ApiCorsPolicy";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

// builder.Services.AddCors(options =>
// {

//     options.AddPolicy(name: apiCorsPolicy,
//                       builder =>
//                       {
//                           builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
//                             .AllowAnyHeader()
//                             .AllowAnyMethod()
//                             .AllowCredentials();
//                           //.WithMethods("OPTIONS", "GET");
//                       });
// });

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseCors(apiCorsPolicy);
app.UseCors( m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

app.Run();
