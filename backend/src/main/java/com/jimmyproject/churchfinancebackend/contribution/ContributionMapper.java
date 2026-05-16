package com.jimmyproject.churchfinancebackend.contribution;

import com.jimmyproject.churchfinancebackend.mapper.MapStructConfig;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface ContributionMapper {

    @Mapping(target = "memberId", source = "member.id")
    ContributionResponse toResponse(Contribution contribution);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "member", ignore = true)
    Contribution toEntity(ContributionRequest request);
}
