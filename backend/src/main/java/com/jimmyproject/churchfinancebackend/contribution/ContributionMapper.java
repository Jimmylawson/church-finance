package com.jimmyproject.churchfinancebackend.contribution;

import com.jimmyproject.churchfinancebackend.mapper.MapStructConfig;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface ContributionMapper {

    @Mapping(target = "memberId", source = "member.id")
    @Mapping(target = "memberFullName", expression = "java(getMemberFullName(contribution))")
    ContributionResponse toResponse(Contribution contribution);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "member", ignore = true)
    Contribution toEntity(ContributionRequest request);

    default String getMemberFullName(Contribution contribution) {
        if (contribution.getMember() == null) {
            return null;
        }

        String firstName = contribution.getMember().getFirstName();
        String lastName = contribution.getMember().getLastName();

        if (lastName == null || lastName.isBlank()) {
            return firstName;
        }

        return firstName + " " + lastName;
    }
}
