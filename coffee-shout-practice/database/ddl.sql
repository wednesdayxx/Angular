drop table if exists [user];
drop table if exists coffeeDate;

create table [user] (
    firstName   NVARCHAR(20),
    lastname    NVARCHAR(20),
    username    NVARCHAR(20),
    [password]    NVARCHAR(20),
    primary key (username)
);

create table coffeeDate (
    [dateTime]  DATETIME2,
    venue       NVARCHAR(50),
    primary key ([dateTime], venue)
);